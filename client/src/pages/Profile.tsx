import { Flag, Heart, } from "lucide-react"
import Navbar from "../components/Navbar"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { useEffect } from "react";

function Profile() {

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return (
    <div >
      <Navbar />
      <div className="px-4">
        <div className="border-3 border-black shadow-[6px_6px_0px_black]  max-w-2xl mx-auto my-6  p-6 flex flex-col gap-4 ">

          <img height={"250px"} width={"250px"} src="https://scontent-maa5-2.cdninstagram.com/v/t51.82787-19/686366405_18098858740908741_2994877721432835691_n.jpg?stp=dst-jpg_s150x150_tt6&_nc_cat=102&ccb=7-5&_nc_sid=f7ccc5&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLnd3dy40MDAuQzMifQ%3D%3D&_nc_ohc=c8jVfXKrcogQ7kNvwFHpsWs&_nc_oc=Adps3cDY4oeagsUj4f4ZX0KLb7dqAMrvWrFqff50G1UsVoLmsMIuW6yjc_AHzL4sz1I&_nc_zt=24&_nc_ht=scontent-maa5-2.cdninstagram.com&_nc_gid=Hd4ODl5HmTrAlOD2XDJjDA&_nc_ss=7fa8c&oh=00_AQKOWPdPehMGBao_IjJGp1xBK3vcBvnWDKVipPomC71z0Q&oe=6AADDB1B" className="rounded-sm object-cover mx-auto " />

          <div>
            <div className="font-semibold text-2xl text-center">Pratham Gupta</div>
            <div className="text-muted-foreground text-center">pratham.xk</div>
          </div>

          <div className=" self-center flex gap-12">
            <div className="flex flex-row-reverse items-center gap-2">
              <div className="text-lg font-semibold">0</div>
              <div className="font-medium flex items-center gap-1"><Flag fill="red" /> Flags:</div>
            </div>
            <div className="flex flex-row-reverse items-center gap-2">
              <div className="text-lg font-semibold">0</div>
              <div className="font-medium flex items-center gap-1"><Flag fill="green" /> Flags:</div>
            </div>
          </div>

          <div className="flex gap-4 my-4 flex-1 flex-col sm:flex-row sm:gap-6">
            <Button className="py-2 px-4 bg-redFlagColor hover:bg-redFlagColorActive flex-1 "><Flag />Vote Red Flag </Button>
            <Button className="py-2 px-4 bg-greenFlagColor hover:bg-greenFlagColorActive flex-1"> <Flag />Vote Green Flag </Button>
          </div>


          {/* <div className="flex gap-2"> */}
          {/*   <Input placeholder="Write your observatoin" /> */}
          {/*   <Button>Add</Button> */}
          {/* </div> */}
          {/* <div className="mt-8"> */}
          {/*   <div className="text-lg my-2">Observations:</div> */}
          {/*   <div className="flex flex-col gap-2"> */}
          {/*     <div className="flex gap-1"> */}
          {/*       <div>Anonymus:</div> */}
          {/*       <div className="text-muted-foreground">He he such a ass guy ignore everyone</div> */}
          {/*     </div> */}
          {/*   </div> */}
          {/*   <div className="flex flex-col gap-1"> */}
          {/*     <div className="flex gap-1"> */}
          {/*       <div>Anonymus:</div> */}
          {/*       <div className="text-muted-foreground">He he such a ass guy ignore everyone</div> */}
          {/*     </div> */}
          {/*   </div> */}
          {/*   <div className="flex flex-col gap-1"> */}
          {/*     <div className="flex gap-1"> */}
          {/*       <div>Anonymus:</div> */}
          {/*       <div className="text-muted-foreground">He he such a ass guy ignore everyone</div> */}
          {/*     </div> */}
          {/*   </div> */}
          {/*   <div className="flex flex-col gap-1"> */}
          {/*     <div className="flex gap-1"> */}
          {/*       <div>Anonymus:</div> */}
          {/*       <div className="text-muted-foreground">He he such a ass guy ignore everyone</div> */}
          {/*     </div> */}
          {/*   </div> */}
          {/*   <div className="flex flex-col gap-1"> */}
          {/*     <div className="flex gap-1"> */}
          {/*       <div>Anonymus:</div> */}
          {/*       <div className="text-muted-foreground">He he such a ass guy ignore everyone</div> */}
          {/*     </div> */}
          {/*   </div> */}
          {/* </div> */}

        </div>

        <div className="border-3 border-black shadow-[6px_6px_0px_black]  max-w-2xl mx-auto my-6 p-6 flex flex-col gap-4 ">
          <div className="flex gap-4 mb-6">
            <Input placeholder="Write your observations..." />
            <Button>Add</Button>
          </div>
          <div>
            <div className="bg-white border-2 shadow-[2px_2px_0px_black] px-2 py-1 flex justify-between items-center gap-2">
              <div>
                <div>Anonymus:</div>
                <div className="text-muted-foreground">He is a fucking moron ignores people the only thing he knows. hello wjdansdjna sdkjas dk as dkasjbdkas dkjasbdkj asnd kasjdb ksand sahbd asn</div>
              </div>
              <div className="px-1"><Heart /> </div>
            </div>
          </div>
          <div className="bg-white border-2 shadow-[2px_2px_0px_black] px-2 py-1 flex justify-between items-center gap-2">
            <div>
              <div>Anonymus:</div>
              <div className="text-muted-foreground">He is a fucking moron ignores people the only thing he knows</div>
            </div>
            <div className="px-1"><Heart /> </div>
          </div>
          <div className="bg-white border-2 shadow-[2px_2px_0px_black] px-2 py-1 flex justify-between items-center gap-2">
            <div>
              <div>Anonymus:</div>
              <div className="text-muted-foreground">He is a fucking moron ignores people the only thing he knows</div>
            </div>
            <div className="px-1"><Heart /> </div>
          </div>
          <div className="bg-white border-2 shadow-[2px_2px_0px_black] px-2 py-1 flex justify-between items-center gap-2">
            <div>
              <div>Anonymus:</div>
              <div className="text-muted-foreground">He is a fucking moron ignores people the only thing he knows</div>
            </div>
            <div className="px-1"><Heart /> </div>
          </div>


          <div className="bg-white border-2 shadow-[2px_2px_0px_black] px-2 py-1 flex justify-between items-center gap-2">
            <div>
              <div>Anonymus:</div>
              <div className="text-muted-foreground">He is a fucking moron ignores people the only thing he knows</div>
            </div>
            <div className="px-1"><Heart /> </div>
          </div>






        </div>

      </div >
    </div >
  )
}

export default Profile
