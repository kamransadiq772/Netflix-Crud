import { useState } from "react"
import "./listitem.scss"
import pic from '../assets/pic.jpg'
import { PlayArrow, ThumbUpAltOutlined, ThumbDownAltOutlined, Add } from '@mui/icons-material'

const ListItem = ({ index }) => {

  const [isHovered, setisHovered] = useState(false);

  const trailer =
    "https://player.vimeo.com/external/371433846.sd.mp4?s=236da2f3c0fd273d2c6d9a064f3ae35579b2bbdf&profile_id=139&oauth2_token_id=57447761";





  return (
    <div className="listitem" onMouseEnter={() => setisHovered(true)} onMouseLeave={() => setisHovered(false)}
      style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
    >
      <img src={pic} alt="" />
      {isHovered && (
        <>
          <video src={trailer} autoPlay={true} loop></video>
          <div className="itemInfo">
            <div className="icons">
              <PlayArrow className="icon" />
              <Add className="icon"/>
              <ThumbUpAltOutlined className="icon"/>
              <ThumbDownAltOutlined className="icon"/>
            </div>  
            <div className="itemInfoTop">
              <span>1 hour 14 mins</span>
              <span className="limit">+16</span>
              <span  >1999</span>
            </div>
            <div className="desc">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio quos aperiam omnis quae amet est!
            </div>
            <div className="genre">
              Action
            </div>
          </div>
        </>
      )}

    </div>
  )
}

export default ListItem