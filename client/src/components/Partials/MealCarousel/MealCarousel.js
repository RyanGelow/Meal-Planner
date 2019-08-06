import React, { Component } from 'react';
import {
  ButtonBack,
  ButtonNext,
  CarouselProvider,
  Slide,
  Slider,
  Image
} from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';
// import Row from './../Row/Row';
// import Column from './../Column/Column';
// import SlideComponent from './SlideComponent/SlideComponent';
import BreakfastMealSelect from './SlideComponent/BreakfastMealSelect';
import EntreMealSelect from './SlideComponent/EntreMealSelect';
import SideMealSelect from './SlideComponent/SideMealSelect';
import FeaturedMealSelect from './SlideComponent/FeaturedMealSelect';
import s from './style.scss';
import axios from 'axios';

class MealCarousel extends Component {

  mealSelect = (param) => {
    switch (param) {
      case 'featured':
        return <FeaturedMealSelect meal="featured"/>
      case 'breakfast':
          return <BreakfastMealSelect meal="breakfast"/>
      case 'entre':
          return <EntreMealSelect meal="entre"/>
      case 'side':
        return <SideMealSelect meal="side"/>
    }
  }
    
  // componentWillMount() {
  //   let param = this.props.meal
  //   this.mealSelect(param)
  // }

  render() {
    let param = this.props.meal
    return(
      <>
        {this.mealSelect(param)}
      </>
    )
  }
}

export default MealCarousel