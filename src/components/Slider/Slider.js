import { useEffect } from 'react'
import StyledSlider from './StyledSlider'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FreeMode, Navigation } from "swiper";
import { useSelector, useDispatch } from 'react-redux';
import { getMoviePopular } from '../../redux/action/movieAction/movieAction'

export const Slider = () => {
    const dispatch = useDispatch()
    const mostPopular = useSelector((state => state.movies.mostPopular))
    const fetchMovie = () => {
        dispatch(getMoviePopular())
    }
    useEffect(() => {
        fetchMovie()
    }, [])

    return (
        <StyledSlider>
            <Swiper
                slidesPerView={6}
                spaceBetween={84}
                freeMode={true}
                slidesPerGroup={1}
                loopFillGroupWithBlank={true}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[FreeMode, Navigation]}
                className="mySwiper"
            >
                {mostPopular?.map((movie, i) => i < 10
                    ?
                        <SwiperSlide key={movie.original_title}>
                            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}/>
                            <div className="info-container">
                                <h5>{movie.original_title}</h5>
                                <span>{new Date(movie.release_date).toISOString().slice(0, 4)}</span>
                            </div>
                        </SwiperSlide>
                    :
                        null
                    )
                }
            </Swiper>
        </StyledSlider>
    )
}
