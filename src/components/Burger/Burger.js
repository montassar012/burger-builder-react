import React from 'react';

import sty from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props)=> {
    return (
        <div className={sty.Burger}>
            <BurgerIngredient type="bread-top"/>
            <BurgerIngredient type="cheese"/>
            <BurgerIngredient type="meat"/>

            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default burger;