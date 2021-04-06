import React,{useEffect} from 'react'
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Divider } from '@material-ui/core';
import ImagemCapa from '../../assets/blogImagens/ecoturismo6dicas.jpg';
import logoTop from '../../assets/LogoBranco.png';
import './styles.css';

import {
    EmailShareButton, EmailIcon,
    FacebookShareButton, FacebookIcon,
    TelegramShareButton, TelegramIcon,
    TwitterShareButton, TwitterIcon,
    WhatsappShareButton, WhatsappIcon,
    LinkedinShareButton,LinkedinIcon,
} from "react-share";

import Footer from '../paginainicial/footer/footer'



export default function Cachoeira10dicas() {
    const shareUrl = 'https://aventurei.com/ecoturismo-6-dicas-aproveitar-melhor'
    const title = 'Ecoturismo: 6 dicas para aproveitar bem melhor o passeio'


    useEffect(() => {
        window.scrollTo(0, 0)
        document.title = `Blog Aventurei - ${title}`
      }, [])
      
    

    return (
        <div className="containerPost">
            <div className="menuPost">
                <Link className="Voltar-top" to="/"><ArrowBackIcon /></Link>
                <div><h3>Blog Aventurei</h3></div>
                <div className="logo-top"><img src={logoTop} alt="fogueira" className="logoBlog" /></div>
            </div>
            <div className="Postcontent">
                <h2 className="titlePost">{title}</h2>
                <Divider style={{ margin: "15px 0" }} />
                <img src={ImagemCapa} alt="capablog" className="CapaPost" />
                <p className="textPost">O turismo ecológico é uma experiência de interação com o meio ambiente de uma maneira sustentável, valorizando o patrimônio natural e incentivando a consciência ambiental nos praticantes. A conservação ecológica é um dos elementos principais do ecoturismo, permitindo uma convivência sadia com a natureza, proporcionando caminhadas, acampamentos, escaladas dentre outras aventuras. Se você possui o espírito livre, este é o seu lugar! <br/><br/>Ficou interessado? Pois bem, aqui vão 7 dicas para você aproveitar o passeio ao máximo.</p>
                <h4 className="subtitlePost">1 - A bagagem</h4>
                <p className="textPost">Sim! Você não precisará de muito para curtir todas as emoções que a natureza pode te oferecer. Além disso, você que carregará todos os seus pertences e quanto maior o peso mais cansaço você sentirá. Portanto, o foco principal é o planejamento! Converse com seu guia, ele possui a experiência necessária para te orientar quantos aos itens indispensáveis. Adianto-lhe sobre o básico: lanterna, agasalho, capa de chuva, estojo de primeiros socorros, comida e água... muita água!</p>
                <h4 className="subtitlePost">2 - Respeito aos animais</h4>
                <p className="textPost">Nunca se esqueça que a visita acontecerá no habitat natural de outros seres vivos e, sendo assim, devemos respeitar todas as regras. Ninguém gosta de uma visitante indesejado ou que não sabe se portar, não é mesmo?! Assim, antecipo-lhe, não faça barulho, não queremos assustar os animais, mas sim observá-los. Mantenha-se sempre em uma distância segura e porte um binóculo, caso não queira perder nenhum detalhe. Lembre-se, aventureiro, consciência em primeiro lugar!</p>
                <h4 className="subtitlePost">3 - Não use flash</h4>
                <p className="textPost">Você estará em um ambiente iluminado, logo não há necessidade disparar um flash de luz. Além do mais, os animais podem se assustar e causar algum dano indesejável. Tome cuidado com qualquer tipo de excesso.</p>
                <h4 className="subtitlePost">4 - Lugar de lixo é no lixo!</h4>
                <p className="textPost">A educação é básica, mas não custa nada relembrar: Lugar de lixo é no lixo! Levar um saco plástico ou de qualquer outro material resistente para descartar os resíduos que você produzir é primordial. O ecoturismo, como exposto anteriormente, é uma experiência de conscientização. Por isso, cuide da natureza e respeite-a, garanto-lhe que ela o recompensará com vivências marcantes!</p>
                <h4 className="subtitlePost">5 - Não retire ou danifique qualquer objeto natural!</h4>
                <p className="textPost">Compreensível que quando aproveitamos ao máximo qualquer momento sempre queremos uma recordação, marcar a experiência para todo o sempre. Contudo, existem formas de fazê-lo sem danificar ou alterar a natureza. Não colha flores ou frutos silvestres, não deteriore, pinte ou rasure rochas ou sedimentos. Quer registrar o momento para sempre? Fotografe (sem flash, como dito)! </p>
                <h4 className="subtitlePost">6 - Não provoque incêndios!</h4>
                <p className="textPost">O Ecoturismo é mais que uma prática é uma filosofia e, dessa forma, deve-se estar atento a todos os seus princípios. Um deles é o respeito ao crescimento e ao desenvolvimento da vegetação e das espécies em seus respectivos habitats. Aproveitar sem destruir é possível, por isso evite materiais inflamáveis.</p>
                <h4 className="subtitlePost">7- Segurança!</h4>
                <p className="textPost">Por fim, mas não menos importante, evite riscos, Aventureiro! Siga as instruções do seu guia, não desvie da trilha ou se afaste do grupo. Sempre fique atento onde pisa, ninguém quer cair ou pisotear um animal, pode ser perigoso. Você estará em um ambiente diferente, com riscos diferentes, saiba que a sua segurança dependerá das escolhas que fizer, portanto, seja responsável. <br/><br/> Gostou das dicas? Esperamos que sim! A partir de agora você está mais preparado para uma experiência inesquecível na natureza. Para mais informações entre em contato com um Guia Aventurei e venha desfrutar de um turismo saudável e consciente.</p>
                
                <Divider style={{ margin: "15px 0" }} />
                <h5>Compartilhe com os amigos</h5>
                <div>
                    <WhatsappShareButton
                        url={shareUrl}
                        title={title}
                        separator=" - "
                        className="Demo__some-network__share-button"
                    >
                        <WhatsappIcon size={32} round />
                    </WhatsappShareButton>

                    <FacebookShareButton
                        url={shareUrl}
                        title={title}
                        className="Demo__some-network__share-button"
                    >
                        <FacebookIcon size={32} round />
                    </FacebookShareButton>
                    <TelegramShareButton
                        url={shareUrl}
                        title={title}
                        className="Demo__some-network__share-button"
                    >
                        <TelegramIcon size={32} round />
                    </TelegramShareButton>
                    <TwitterShareButton
                        url={shareUrl}
                        title={title}
                        className="Demo__some-network__share-button"
                    >
                        <TwitterIcon size={32} round />
                    </TwitterShareButton>
                    <LinkedinShareButton
                        url={shareUrl}
                        title={title}
                        className="Demo__some-network__share-button"
                    >
                        <LinkedinIcon size={32} round />
                    </LinkedinShareButton>
                    <EmailShareButton
                        url={shareUrl}
                        subject={title}
                        className="Demo__some-network__share-button"
                    >
                        <EmailIcon size={32} round />
                    </EmailShareButton>

                </div>



            </div>
            <Footer />
        </div>
    )
}
