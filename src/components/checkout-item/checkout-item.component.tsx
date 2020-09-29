import React from "react";
import '../../pages/checkout/checkout.styles.scss';
import {ReactComponent as DeleteIcon} from '../../assets/icons/delete.svg';
import {ReactComponent as PlusIcon} from '../../assets/icons/plus.svg';
import {ReactComponent as MinusIcon} from '../../assets/icons/minus.svg';
import {gql, useMutation, useQuery} from "@apollo/client";
import {initSagaSignOut} from "../../redux/user/user.reducer";

type PropsType = {
    id: number
    name: string
    imageUrl: string
    price: number
    quantity: number
    removeItem: (id: number) => void
    changeAmount: (direction: 'inc' | 'dec', id: number) => void
}
const CHANGE_QUANTITY = gql`
    mutation ChangeQuantityGraphql($payload: Payload!) {
        ChangeQuantityGraphql(payload: $payload) @client
    }
`;
const REMOVE_ITEM = gql`
    mutation RemoveItemFromCart($id: Int!) {
        RemoveItemFromCart(id: $id) @client
    }
`;
export const CheckoutItemComponent = (props: PropsType) => {

    const {price, name, imageUrl, quantity, removeItem, id, changeAmount} = props;

    const [RemoveItemFromCart] = useMutation(REMOVE_ITEM);
    const onRemoveHandler = () => RemoveItemFromCart({variables: {id}});
    // const onRemoveHandler = () => removeItem(id);

    const [ChangeQuantityGraphql] = useMutation(CHANGE_QUANTITY);
    const onChangeAmountHandler = (direction: 'inc' | 'dec') => ChangeQuantityGraphql({variables: {payload: {direction, id}}});
    //const onChangeAmountHandler = (direction: 'inc' | 'dec') => changeAmount(direction, id);

    const disabledSvg = quantity === 1 ? 'svg-wrap disabled' : 'svg-wrap';

    return (
        <div className={'checkout-table__row'}>
            <div className={'checkout-table__column checkout-table__column-product'}>
                <img src={imageUrl} alt={'item'}/>
            </div>
            <div className={'checkout-table__column checkout-table__column-description'}>
                {name}
            </div>
            <div className={'checkout-table__column checkout-table__column-quantity'}>
                <div className={disabledSvg}>
                    <MinusIcon onClick={() => onChangeAmountHandler('dec')}/>
                </div>
                {quantity}
                <div className={'svg-wrap'}>
                    <PlusIcon onClick={() => onChangeAmountHandler('inc')}/>
                </div>
            </div>
            <div className={'checkout-table__column checkout-table__column-price'}>
                ${price}
            </div>
            <div className={'checkout-table__column checkout-table__column-remove'}>
                <DeleteIcon onClick={onRemoveHandler}/>
            </div>
        </div>
    )
}