import React, { useCallback, useContext, useRef, useState } from "react"
import {
  motion,
  useReducedMotion,
  type Transition,
} from "framer-motion"
import api from "../../api/api"
import { toast } from "sonner"
import UserTokenContext from "../../context/userToken"

// ─── Types ───────────────────────────────────────────────────────────────────

export interface LikeButtonProps {
  /** Controlled liked state. Leave undefined for uncontrolled usage */
  liked?: boolean

  /** Initial liked state when uncontrolled. Default false */
  defaultLiked?: boolean

  /** Fires with the next liked state on every toggle */
  onLikedChange?: (liked: boolean) => void

  /** Visual size of the heart */
  size?: "sm" | "md" | "lg"

  /** Colors cycled across the burst particles */
  particleColors?: string[]

  /** Disables pointer and keyboard interaction */
  disabled?: boolean

  /** Accessible name of the action. Default "Like" */
  label?: string

  className?: string

  _id: string
}

// ─── Constants ───────────────────────────────────────────────────────────────

const PARTICLE_COUNT = 8
const BURST_DURATION = 0.55

const FILL_SPRING: Transition = {
  type: "spring",
  stiffness: 500,
  damping: 30,
}

const UNFILL_TWEEN: Transition = {
  duration: 0.15,
  ease: "easeOut",
}

const POP_KEYFRAMES = [1, 0.6, 1.3, 1]

const POP_TRANSITION: Transition = {
  duration: 0.45,
  times: [0, 0.25, 0.6, 1],
  ease: "easeOut",
}

const HEART_ORIGIN = "50% 60%"

const DEFAULT_PARTICLE_COLORS = [
  "var(--like-particle-1)",
  "var(--like-particle-2)",
  "var(--like-particle-3)",
  "var(--like-particle-4)",
  "var(--like-particle-5)",
  "var(--like-particle-6)",
]

const SIZES = {
  sm: 16,
  md: 20,
  lg: 24,
} as const

const HEART_PATH =
  "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"

// ─── Component ───────────────────────────────────────────────────────────────

export function LikeButton({
  liked: likedProp,
  defaultLiked = false,
  onLikedChange,
  size = "lg",
  particleColors = DEFAULT_PARTICLE_COLORS,
  disabled = false,
  label = "Like",
  _id,
  className,
}: LikeButtonProps) {
  const shouldReduceMotion = useReducedMotion()

  const [internalLiked, setInternalLiked] = useState(defaultLiked)

  const [burst, setBurst] = useState<number | null>(null)

  const burstIdRef = useRef(0)

  const liked = likedProp ?? internalLiked

  const icon = SIZES[size]

  const handleClick = useCallback(() => {
    if (disabled) return

    const next = !liked

    if (likedProp === undefined) {
      setInternalLiked(next)
    }

    onLikedChange?.(next)

    if (next && !shouldReduceMotion) {
      burstIdRef.current += 1
      setBurst(burstIdRef.current)
    }
  }, [
    disabled,
    liked,
    likedProp,
    onLikedChange,
    shouldReduceMotion,
  ])


  const userTokenData = useContext(UserTokenContext)

  return (
    <motion.button
      type="button"
      onClick={async () => {
        handleClick()
        if (_id != "0") {
          userTokenData.setUserData(prev => {
            const likeBtn = prev.likedComments
            const data = prev
            data.likedComments = [...likeBtn, _id]
            return data
          })
          try {
            await api.patch(`/comments/like/${_id}`)
          } catch {
            toast.error("Something went wrong", { position: "top-center" })
          }
        }
      }}
      disabled={disabled}
      aria-pressed={liked}
      aria-label={label}
      whileTap={
        shouldReduceMotion
          ? undefined
          : { scale: 0.9 }
      }
      className={[
        "relative inline-flex items-center justify-center",
        "appearance-none border-0 bg-transparent p-0",
        "cursor-pointer",
        "focus-visible:outline-none",
        "disabled:pointer-events-none disabled:opacity-50",
        className ?? "",
      ].join(" ")}
    >
      <motion.span
        className="relative inline-flex items-center justify-center"
        style={{
          width: icon,
          height: icon,
          transformOrigin: HEART_ORIGIN,
        }}
        initial={false}
        animate={
          liked && !shouldReduceMotion
            ? { scale: POP_KEYFRAMES }
            : { scale: 1 }
        }
        transition={POP_TRANSITION}
      >
        {/* Heart outline */}
        <svg
          viewBox="0 0 24 24"
          width={icon}
          height={icon}
          fill="none"
          stroke="var(--like-heart-outline)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          className="text-[var(--like-heart)]"
        >
          <path d={HEART_PATH} />
        </svg>

        {/* Filled heart */}
        <motion.svg
          viewBox="0 0 24 24"
          width={icon}
          height={icon}
          className="absolute inset-0 text-[var(--like-heart)]"
          style={{
            transformOrigin: HEART_ORIGIN,
          }}
          fill="currentColor"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          initial={false}
          animate={{
            scale: liked ? 1 : 0,
            opacity: liked ? 1 : 0,
          }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : liked
                ? FILL_SPRING
                : UNFILL_TWEEN
          }
        >
          <path d={HEART_PATH} />
        </motion.svg>

        {/* Burst */}
        {burst !== null && !shouldReduceMotion && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 flex items-center justify-center"
          >
            {/* Ring */}
            <motion.span
              key={`ring-${burst}`}
              className="absolute rounded-full border-2 border-[var(--like-burst-ring)]"
              style={{
                width: icon * 1.6,
                height: icon * 1.6,
              }}
              initial={{
                scale: 0.3,
                opacity: 0.9,
              }}
              animate={{
                scale: 2,
                opacity: 0,
              }}
              transition={{
                duration: BURST_DURATION,
                ease: "easeOut",
              }}
              onAnimationComplete={() => {
                setBurst((current) =>
                  current === burst ? null : current,
                )
              }}
            />

            {/* Particles */}
            {Array.from({
              length: PARTICLE_COUNT,
            }).map((_, index) => {
              const angle =
                (index / PARTICLE_COUNT) *
                Math.PI *
                2 -
                Math.PI / 2

              const distance =
                icon *
                (index % 2 === 0 ? 1.9 : 1.5)

              const dotSize = Math.max(
                3,
                Math.round(icon * 0.26),
              )

              return (
                <motion.span
                  key={`particle-${burst}-${index}`}
                  className="absolute rounded-full"
                  style={{
                    width: dotSize,
                    height: dotSize,
                    backgroundColor:
                      particleColors[
                      index %
                      particleColors.length
                      ],
                  }}
                  initial={{
                    x: 0,
                    y: 0,
                    scale: 0,
                    opacity: 1,
                  }}
                  animate={{
                    x:
                      Math.cos(angle) *
                      distance,
                    y:
                      Math.sin(angle) *
                      distance,
                    scale: [0, 1, 0.4],
                    opacity: [1, 1, 0],
                  }}
                  transition={{
                    duration: BURST_DURATION,
                    ease: "easeOut",
                  }}
                />
              )
            })}
          </span>
        )}
      </motion.span>
    </motion.button>
  )
}
