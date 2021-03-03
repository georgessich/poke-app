import React from 'react'
import './style.css';
export default function Card({ pokemon }) {
    return (
        <div className='Card'>
            <div >
                <img className='Card__img' src={pokemon.sprites.other.dream_world.front_default}/>
            </div>
            <div className='Card__name'>
                {pokemon.name}
            </div>
            <div className='Card__types'>
                {pokemon.types.map(type => {
                    return (
                        <div className='Card__type'>
                            {type.type.name}
                        </div>
                    )
                })}
            </div>
            <div className='Card__info'>
                <div className='Card__data Card__data--weight'>
                   <p className='title'>Weight</p>
                   <p>{pokemon.weight}</p> 
                </div>
                <div className='Card__data Card__data--height'>
                   <p className='title'>Height</p>
                   <p>{pokemon.height}</p> 
                </div>
                <div className='Card__data Card__data--ability'>
                   <p className='title'>Ability</p>
                   <p>{pokemon.abilities[0].ability.name}</p> 
                </div>
            </div>
        </div>
    )
}
