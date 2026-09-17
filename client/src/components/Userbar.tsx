import { Flag } from "lucide-react"
import { Button } from "./ui/button"
import { useNavigate } from "react-router-dom"

function Userbar() {
  const navigate = useNavigate()
  return (

    <div className="bg-white border-2 shadow-[2px_2px_0px_black] p-6 " tabIndex={0} onClick={() => navigate("/profile")}>
      <div className="flex justify-between rounded-sm gap-4 ">
        <div className="shrink-0">
          <img height={"150px"} width={"150px"} src="https://scontent-maa5-2.cdninstagram.com/v/t51.82787-19/651517551_18315721327281174_1419939779158868367_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_cat=101&ccb=7-5&_nc_sid=f7ccc5&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy4xMDgwLkMzIn0%3D&_nc_ohc=xc_zkGK8RKAQ7kNvwGxSraw&_nc_oc=Adpl-QQeQdGN1MVLuvC8F4_mYug2W_eqku87wpG89WZGTzvFkckLrHXm1zdn9EaBlCI&_nc_zt=24&_nc_ht=scontent-maa5-2.cdninstagram.com&_nc_gid=fMvuE8uMXL-mMWrPYuFliA&_nc_ss=7fa8c&oh=00_AQIr9YnOIiqxdS03-ezY70iD5zOn3mHwvStEVU3Q0618aQ&oe=6AAD77B4" className="rounded-sm" />
        </div>
        <div className=" flex-1 relative flex flex-col flex-nowrap min-w-0">
          <div className="font-semibold text-2xl whitespace-nowrap text-ellipsis overflow-hidden">Pratham Gupta</div>
          <div className="text-muted-foreground whitespace-nowrap text-ellipsis overflow-hidden">pratham.xk</div>
          <div className="text-muted-foreground ellipseCan">Loves cat food and he is too fat</div>
          <div className=" gap-8 mt-auto hidden sm:flex">
            <Button className="py-2 px-4 bg-redFlagColor hover:bg-redFlagColorActive"><Flag />(20) Red Flags </Button>
            <Button className="py-2 px-4 bg-greenFlagColor hover:bg-greenFlagColorActive"> <Flag />(12) Green Flags </Button>
          </div>
        </div>
      </div>
      <div className=" gap-4 mt-6 flex flex-col sm:hidden">
        <Button className="py-2 px-4 bg-redFlagColor hover:bg-redFlagColorActive"><Flag />(20) Red Flags </Button>
        <Button className="py-2 px-4 bg-greenFlagColor hover:bg-greenFlagColorActive"> <Flag />(12) Green Flags </Button>
      </div>
    </div>

  )
}

export default Userbar
