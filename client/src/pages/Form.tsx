import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"

export default function Form() {

  return (
    <div className="max-w-5xl h-screen flex justify-center items-center  mx-auto ">
      <div className="flex border-3 border-black shadow-[6px_6px_0px_black] w-full  m-2 mx-4 ">
        <div className="flex-1 m-8 flex flex-col gap-6 relative">

          <div className="flex flex-col gap-1">
            <div className='font-bold text-4xl formTitle'>HELLO WORLD</div>
            <div className='text-xl'>Enter your friends details below</div>
          </div>

          <div>
            <div>Full Name</div>
            <Input placeholder="Rockstar Kapoor" />
          </div>

          <div>
            <div>Instagram Username </div>
            <Input placeholder="rockstar_kapoor.xk" />
          </div>


          <div>
            <div className="text-muted-foreground text-sm hidden md:block">*Thanks for contributing to this site and I hope you are enjoying the experience and by contribution to this small project you are making a new social media to which you are part, at its core. (anonymous)</div>
            <div className="text-muted-foreground text-sm block md:hidden">*Thanks for contributing and I hope you are enjoying the experience.</div>
          </div>

          <div className="flex-1">
            <Button className="w-full">Submit</Button>
          </div>


        </div>
        <div className="flex-1  hidden md:block">
          <img alt="img" src="penguin.webp" className="w-full h-full object-cover" />
        </div>
      </div>
    </div >
  )
}

