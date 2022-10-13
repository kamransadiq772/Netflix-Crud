import './featured.scss'
import pic from '../assets/pic.jpg'
import logo from '../assets/logo.png'
import {PlayArrow, InfoOutlined} from '@mui/icons-material'
 
const Featured = ({type}) => {
  return (
    <div className='featured' >
        {type && (
            <div className="category">
                <span>{type === "movie" ? "Movies":"Series"}</span>
                <select name="genre" id="genre">
                    <option value="">Genre</option>
                    <option value="adventure">Adventure</option>
                    <option value="comedy">Comedy</option>
                    <option value="crime">Crime</option>
                    <option value="fantasy">Fantasy</option>
                    <option value="historical">Historical</option>
                    <option value="horror">Horror</option>
                    <option value="romance">Romance</option>
                    <option value="sci-fi">Sci-fi</option>
                    <option value="thriller">Thriller</option>
                </select>
            </div>
        )}
        <img src={pic} alt="" />
        <div className="info">
            <img src={logo} alt="" />
            <span className="desc">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Temporibus iusto aut cum eligendi numquam. Aliquid!</span>
            <div className="buttons">
                <button className="play">
                    <PlayArrow />
                    <span>Play</span>
                </button>
                <button className="more">
                    <InfoOutlined />
                    <span>Info</span>
                </button>
            </div>
        </div>
    </div>
  )
}

export default Featured