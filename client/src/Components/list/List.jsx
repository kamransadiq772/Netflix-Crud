import { useState, useRef } from 'react'
import './list.scss'
import { ArrowBackIosNewOutlined, ArrowForwardIosOutlined } from '@mui/icons-material'
import ListItem from '../listitem/ListItem'

const List = () => {
    const [slidNumber, setslidNumber] = useState(0);
    const [isMoved, setisMoved] = useState(false);

    const listRef = useRef()


    const handleClick = (direction) => {
        setisMoved(true)
        let distance = listRef.current.getBoundingClientRect().x - 50
        // console.log(distance);

        if (direction === "left" && slidNumber > 0) {
            setslidNumber(slidNumber-1)
            listRef.current.style.transform = `translateX(${230 + distance}px)`
        }
        if (direction === "right" && slidNumber < 5) {
            setslidNumber(slidNumber+1)
            listRef.current.style.transform = `translateX(${-230 + distance}px)`
        }

    }


    return (
        <div className='list'>
            <span className="listTitle">Continue to watch</span>
            <div className="wrapper">
                <ArrowBackIosNewOutlined style={{display : !isMoved && 'none'}} className='sliderArrow left' onClick={() => handleClick("left")} />
                <div className="container" ref={listRef}>
                    <ListItem index={0} />
                    <ListItem index={1}/>
                    <ListItem index={2}/>
                    <ListItem index={3}/>
                    <ListItem index={4}/>
                    <ListItem index={5}/>
                    <ListItem index={6}/>
                    <ListItem index={7}/>
                    <ListItem index={8}/>
                    <ListItem index={9}/>
                </div>
                <ArrowForwardIosOutlined className='sliderArrow right' onClick={() => handleClick("right")} />
            </div>
        </div>
    )
}

export default List