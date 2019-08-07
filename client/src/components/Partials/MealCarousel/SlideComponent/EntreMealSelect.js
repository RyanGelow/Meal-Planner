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
import s from './../style.scss';
import axios from 'axios';
import MainCourseDropDown from './../../MainCourseDropDown'
import Row from './../../Row/Row'
import Column from './../../Column/Column'

class EntreMealSelect extends Component {

    state = {
        meals: [],
        entre: "chicken"
    };
    
    componentDidMount(){
        console.log("form entre meal")
        // this.props.entreState(this.setState)xx
        this.mealDisplay();
    }
    
    handleIncrement = (index) => {
        this.setState(prevState => {
            const newMeals = [...this.state.meals]
            newMeals[index].count += 1
            return { meals: newMeals}
        })
    }

    handleDecrement = (index) => {
        this.setState(prevState => {
            const newMeals = [...this.state.meals]
            newMeals[index].count -= 1
            return { meals: newMeals}
        })
    }
    
    mealDisplay = () => {
        this.setState({ meals: []})
        const query = this.state.entre
        console.log(query)
        axios.get("https://www.themealdb.com/api/json/v1/1/filter.php?c=" + query)
            .then(entre => {
                const meals = entre.data.meals
                console.log(meals);
                const newEntres = [];
                meals.forEach(meal => {
                    newEntres.push({...meal, count: 0});
                    const URL = `/api/meal?meal=${meal.strMeal}`;
                    axios.get(URL).then(res => {
                        console.log(res.data.foods);
                        let calories = 0;
                        let protein = 0;
                        let carbs = 0;
                        let fat = 0;
                        if (res.data.foods) {
                            for (let i = 0; i < res.data.foods.length; i++) {
                              calories += res.data.foods[i].nf_calories;
                              protein += res.data.foods[i].nf_protein;
                              carbs += res.data.foods[i].nf_total_carbohydrate;
                              fat += res.data.foods[i].nf_total_fat;
                            }
                        }
                        meal.calories = Math.floor(calories);
                        meal.protein = Math.floor(protein);
                        meal.carbs = Math.floor(carbs);
                        meal.fat = Math.floor(fat);
                    })
                })

                this.setState({meals: newEntres});
            })
            .catch(error => {
                console.log(error)
            }) 
    }

    handleMealSelect = value => {
        
        this.setState({
            entre: value
          }, () => {
              this.mealDisplay()
          })
    }

    render() {
        
        console.log(this.state);
        return (
            <>
            <Row>
                <Column small="12" medium="6">
                    <h3>Lunch & Dinner </h3>
                </Column>
                <Column small="12" medium="6 d-flex justify-content-end">
                    <MainCourseDropDown onMealSelect={this.handleMealSelect}/>
                </Column>
            </Row>
            <CarouselProvider
                visibleSlides={3}
                totalSlides={this.state.meals.length}
                step={1}
                naturalSlideWidth={250}
                naturalSlideHeight={250}
                hasMasterSpinner
            >
                <div className={s.container}>
                <Slider
                    className="border border-danger rounded"
                >
                    {this.state.meals.map((item, index) => {
                            return (
                                <Slide>
                                    <div style={{
                                        "display": "flex",
                                        "flex-direction": "column",
                                        "align-items": "flex-start"
                                    }}>
                                        <Image src={item.strMealThumb} style={{ "position": "absolute", "z-index": -1 }} />
                                        <div style={{ "z-index": 1, "position": "absolute", "bottom": "0", "align-self": "center" }}>
                                            <p
                                                style={{ "background": "rgba(235, 235, 235, 0.6)", "text-align": "center", "font-weight": "900" }}
                                            >
                                                {item.strMeal}
                                            </p>
                                            <p
                                                style={{ "background": "rgba(235, 235, 235, 0.6)", "text-align": "center" }}
                                            >
                                                {"Carbs: " + item.carbs + "g "}
                                                {"Fat: " + item.fat + "g "}
                                                {"Protein: " + item.protein + "g "} 
                                                {"Calories: " + item.calories}
                                            </p>
                                            <p 
                                                style={{ "background": "rgba(235, 235, 235, 0.6)", "text-align": "center" }}>
                                                    {"Count: " + item.count}
                                            </p>
                                            <p 
                                                style={{ "text-align": "center" }}
                                            >
                                                <button className="btn btn-dark" type="button" onClick={() => { this.handleDecrement(index) }}>-1</button>
                                                <button className="btn btn-dark" type="button" onClick={() => { this.handleIncrement(index) }}>+1</button>
                                            </p>
                                        </div>
                                    </div>
                                </Slide>
                            )
                        })}
                </Slider>
                <ButtonBack
                    className={"btn btn-dark" + s.buttonBack}
                >
                    Back
                </ButtonBack>
                <ButtonNext
                    className={"btn btn-dark" + s.buttonNext}
                >
                    Next
                </ButtonNext>
                </div>
            </CarouselProvider>
            </>
        )
    }
}

export default EntreMealSelect;