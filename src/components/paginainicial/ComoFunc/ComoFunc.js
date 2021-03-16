import React from 'react'
import './styles.css'

import imgPasso1 from '../../../assets/ComoFunc-01.png'
import imgPasso2 from '../../../assets/ComoFunc-02.png'
import imgPasso3 from '../../../assets/ComoFunc-03.png'
import imgPasso4 from '../../../assets/ComoFunc-04.png'

export default function ComoFunc() {
    return (
        <div className="FuncContainer">
            <h2 style={{fontWeight:600}}>É muito simples como funciona</h2>
            <div className="CardContainer">
                <div className="CardComoFun">
                    <p style={{ fontSize: '70%' }}>Passo 1</p>
                    <img src={imgPasso1} className="imgComoFunc" alt="Imagem de pesquisa" />
                    <h3 className="titleCardComo">Pesquise sua aventura ideal</h3>
                    <p>Faça uma busca detalhada para encontrar exatamente o que você deseja.</p>
                </div>
                <div className="CardComoFun">
                    <p style={{ fontSize: '70%' }}>Passo 2</p>
                    <img src={imgPasso2} className="imgComoFunc" alt="Imagem de pesquisa" />
                    <h3 className="titleCardComo">Confira os detalhes do lugar</h3>
                    <p>Dê uma olhada nas fotos, leia a descrição e as orientações do local de como chegar.</p>
                </div>
                <div className="CardComoFun">
                    <p style={{ fontSize: '70%' }}>Passo 3</p>
                    <img src={imgPasso3} className="imgComoFunc" alt="Imagem de pesquisa" />
                    <h3 className="titleCardComo">Reserve com o guia</h3>
                    <p>Converse com o Guia Aventurei para combinar a data e horário da aventura.</p>
                </div>
                <div className="CardComoFun">
                    <p style={{ fontSize: '70%' }}>Passo 4</p>
                    <img src={imgPasso4} className="imgComoFunc" alt="Imagem de pesquisa" />
                    <h3 className="titleCardComo">Chegue e aventure-se!</h3>
                    <p>Encontre-se com o Guia Aventurei no local e data marcado e depois é só aproveitar a aventura.</p>
                </div>
            </div>
        </div>
    )
}
