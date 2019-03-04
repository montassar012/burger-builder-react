import React, {Component} from 'react';

import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'

const INGREDIENT_PRICES = {
    salad: 2,
    bacon: 1,
    cheese:1,
    meat: 4

}

class BurgerBuilder extends Component {
    state = {
        ingredients : {
            salad: 0,
            bacon: 0,
            cheese:0,
            meat: 0
        },
        totalPrice : 4,
        purchasable : false,
        purchasing: false
    }

    updatePurchaseState(updatedIngredients){
        const ingredients = {
            ...updatedIngredients
        };
        const sum = Object.keys(ingredients).map(igKey =>{
            return ingredients[igKey];
        }).reduce((sum,el)=>sum+el,0);
        this.setState({purchasable:sum>0})

    }
    addIngredientHandler =(type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCounted = oldCount+1;
        const updatedIngredients= {
            ...this.state.ingredients
        }
        updatedIngredients[type]= updatedCounted;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice= oldPrice +priceAddition;
        this.setState({totalPrice: newPrice,ingredients: updatedIngredients})
        this.updatePurchaseState(updatedIngredients)
    }

    removeIngredientHandler =(type)=>{
        const oldCount = this.state.ingredients[type];
        if(oldCount<=0 ){
            return;
        }
        const updatedCounted = oldCount-1;

        const updatedIngredients= {
            ...this.state.ingredients
        }
        updatedIngredients[type]= updatedCounted;
        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice= oldPrice -priceDeduction;
        this.setState({totalPrice: newPrice,ingredients: updatedIngredients})
        this.setState({totalPrice: newPrice,ingredients: updatedIngredients})
        this.updatePurchaseState(updatedIngredients)
    }

    purchaseHandlerFalse() {
        this.setState({purchasing: true}) // this of the caller
    }

    purchaseHandler= () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler =() =>{
        this.setState({purchasing: false})
    }
    render() {
        const disabledInfo ={
            ...this.state.ingredients
        };
        for(let key in disabledInfo) {
            disabledInfo[key]=disabledInfo[key] <=0
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary ingredients={this.state.ingredients}/>
                </Modal>
                <Burger  ingredients={this.state.ingredients}/>
                <BuildControls  ingredientAdded={this.addIngredientHandler}
                                ingredientRemoved={this.removeIngredientHandler}
                                disabled={disabledInfo} price={this.state.totalPrice}
                                purchasable={!this.state.purchasable}
                                ordered={this.purchaseHandler}
                />
            </Aux>
        );
    }
}


export default BurgerBuilder;