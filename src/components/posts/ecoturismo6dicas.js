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
                <p className="textPost">O ecoturismo ou turismo ecológico é uma prática turística que valoriza os patrimônios naturais de forma sustentável e incentiva sua conservação ecológica, além de auxiliar na formação de uma consciência ambiental através da experiência com a natureza realizando atividades que permitem a convivência com a natureza através de caminhadas, acampamentos, palestras entre outras atividades.<br /><br />Se você está interessado em conhecer o Ecoturismo, nós temos algumas dicas que vão te ajudar a aproveitar bem o passeio.</p>
                <h4 className="subtitlePost">1 - Seja sábio ao levar a bagagem</h4>
                <p className="textPost">Leve o mínimo! Você terá que carregar a bagagem por todo o passeio então quanto menos peso menor o cansaço. Converse com o Guia de sua excursão e confira com ele o que você irá precisar e planeje-se. Entretanto, alguns itens são indispensáveis, como: lanterna, agasalho, capa de chuva, estojo de primeiros socorros, alimento e água, muita água.</p>
                <h4 className="subtitlePost">2 - Respeite os animais</h4>
                <p className="textPost">Lembre-se aquele ambiente é a casa de muitos animais, por isso não faça muito barulho para não assustá-los e se desejar observá-los, faça isso de longe e tenha um binóculo para não correr riscos nem de assustá-lo nem mesmo de ser atacado pelos mais ariscos.</p>
                <h4 className="subtitlePost">3 - Não deixe lixo no local</h4>
                <p className="textPost">Leve com você um saco plástico para depositar todo o lixo que irá produzir no passeio, o ecoturismo é uma experiência de conscientização e não apenas de diversão, por isso cuide bem da natureza e ela te recompensará com toda a sua beleza.</p>
                <h4 className="subtitlePost">4 - Não leve nada para casa</h4>
                <p className="textPost">A natureza está ali pra ser admirada, evite colher flores silvestres e ou fragmentos de pedras de grutas e cavernas. Essa é uma atitude simples, mas fundamental para a filosofia do ecoturismo. Além disso, nunca pinte ou rasure rochas, cavernas ou grutas. Uma boa forma de ter uma lembrança é fotografar o passeio, mas é importante evitar o flash para não assustar os animais.</p>
                <h4 className="subtitlePost">5 - Evite incêndios</h4>
                <p className="textPost">Nunca jogue cigarro no chão, uma simples fagulha pode desencadear um incêndio e atrapalhar todo o desenvolvimento da vegetação.</p>
                <h4 className="subtitlePost">6 - Segurança</h4>
                <p className="textPost">Evite riscos! Fique sempre junto do grupo, nunca se desvie da trilha e tenha atenção ao chão para não pisar em animais como cobras ou mesmo evitar quedas. Lembre-se que o salvamento em algumas áreas de vegetação é complicado dessa maneira a segurança de seu passeio depende de sua atenção.<br/><br/>Agora que você já está preparado para se aventurar como ecoturista, entre em contato com nossos guias e conheça nossas aventuras.</p>
                
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
