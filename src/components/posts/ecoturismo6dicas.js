import React,{useEffect} from 'react'
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Divider } from '@material-ui/core';
import ImagemCapa from '../../assets/blogImagens/cachoeira10dicas.jpg';
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
                <p className="textPost">Vai chegando o final de semana ou aquele período de férias e nós ficamos animados em fazer aquele passeio na cachoeira da região. Não é difícil encontrar notícias sobre acidentes e até óbito nesses lugares por falta de cuidados e conhecimento, e como muitos de nós sabemos, uma cachoeira é uma área que devem ser tomados alguns cuidados para aproveitarmos o passeio com segurança.
                    <br /><br />E nós do Aventurei queremos que você aproveite qualquer passeio com muita segurança. Por isso mesmo, preparamos uma lista com algumas dicas para que você aproveite sem colocar sua vida em risco.
                </p>
                <h4 className="subtitlePost">1 - Brincadeira tem hora</h4>
                <p className="textPost">Sabe aquele ditado <i>“Brincadeira tem hora!”</i>? Pois bem, se tratando de cachoeira é bom levar ele muito a sério. Aquelas brincadeiras de ameaçar empurrar, sustos nós colegas pode ser algo legal pra você no momento, mas é bom evitar. Certas quedas, por mais pequenas que sejam, podem ser fatais então brinquem com responsabilidade.</p>
                <h4 className="subtitlePost">2 - Sem chinelos de dedo</h4>
                <p className="textPost">Aqueles chinelos de dedo podem ser confortáveis e práticos em algum momento, mas não para ir na cachoeira. Primeiro que se entrar na água com ele a correnteza pode levar e você vai voltar para casa sem ele. Quando molhados ficam escorregadios, podendo fazer você cair ou até mesmo ficar preso na lama.<br /><br />Uma ótima opção são as sapatilhas emborrachadas (para rios e cachoeiras), com um solado apropriado para água. Caso não tenha, aquele tênis da academia é uma opção e depois só calce quando seus pés estiverem secos.</p>
                <h4 className="subtitlePost">3 - Não consuma bebidas alcoólicas</h4>
                <p className="textPost">Se você gosta de uma cervejinha, deixe para beber depois que voltar da trilha e  em local seguro. Não arrisque sua vida à toa. Ao sair para fazer sua trilha, seja de carro, seja de moto, seja a pé, não faça uso de bebidas alcoólicas ou de entorpecentes. Você precisa de sua razão, de seu juízo perfeito para tomar decisões acertadas.</p>
                <h4 className="subtitlePost">4 - Cachoeiras em dias chuvosos</h4>
                <p className="textPost">Ter cuidado com a natureza é algo de que todos precisamos. Mantê-la bem preservada é essencial para nossa vida; porém, precisamos tomar cuidado com ela. Os cuidados e cachoeiras também são importantes na hora de planejar a ida.Com a chuva, pode trilhar um caminho mais lamacento, podendo escorregar e sofrer um acidente; ter sua visibilidade prejudicada devido a possíveis neblinas; poder ser levado por uma tromba d’água. Não corra esse risco em vão.</p>
                <h4 className="subtitlePost">5 - Respeite a sinalização do local</h4>
                <p className="textPost">Gosta de aventura? Isso é excelente. Mas lembre- se de respeitar a sinalização de locais mais perigosos. Não tome banho em locais proibidos ou mais perigosos. Os avisos são para preservar a sua vida.Fique atento!</p>
                <h4 className="subtitlePost">6 - Atenção no mergulho</h4>
                <p className="textPost">Você gosta de mergulhar? Cuidado! Não entre de cabeça. Fique atento aos obstáculos naturais. Os cuidados em cachoeiras  englobam esse tipo de atenção. Alguns poços costumam ter obstáculos mais discretos e que muitas vezes não são vistos.<br /><br />Mesmo que conheça o local há anos, as águas se movimentam com frequência, trocando pedras de lugar e  abrindo buracos em pontos que não existiam. Isso além de trazer outros entulhos desconhecidos para a água, causando não só afogamentos, como acidentes graves. Entre na água com cautela.</p>
                <h4 className="subtitlePost">7 – Olho nas crianças</h4>
                <p className="textPost">Aproveitar as belezas naturais em família é algo fantástico. Mas, para quem tem crianças, é sempre  bom redobrar os cuidados em cachoeiras. Fique sempre de olho  nelas ou  mantenha um adulto responsável por cuidar delas. Como são aventureiras e exploradoras, elas não temem o perigo real que as cachoeiras representam. Olho nelas!</p>
                <h4 className="subtitlePost">8 – Cuidado na trilha</h4>
                <p className="textPost">Chegar a uma cachoeira nem sempre é fácil. Muitas vezes existem obstáculos naturais que tornam o caminho difícil de se atravessar. Nas áreas mais difíceis de atravessar, faça o simples. Não arrisque pulos e se possível, caminhe usando as mãos também. Tropeços, tombos e machucados podem ser evitados se você optar por caminhar de forma segura.<br /><br />Ao chegar ao poço ou mesmo a uma parte da cachoeira, fique atento. Rochas e raízes são arrastadas pelas correntes e ficam no fundo do rio, podendo atrapalhar o trajeto dos mais desatentos.  Antes de dar um passo, teste se está seguro antes de colocar seu peso todo sobre o apoio, seja uma pedra, um tronco ou um galho.</p>
                <h4 className="subtitlePost">9 – Temperatura da água</h4>
                <p className="textPost">Muitas vezes, ao entrar em um poço, o banhista joga totalmente na água. Não faça isso. Verifique primeiro a temperatura. Quando ela for gelada demais, opte por entrar aos poucos. Saiba que a diferença de temperatura entre a água e o seu corpo pode provocar cãibras em seus músculos. E o pior, se você estiver com cãibras em um poço profundo, pode correr o risco de se afogar.</p>
                <h4 className="subtitlePost">10 – Conheça a região</h4>
                <p className="textPost">Os cuidados em cachoeiras devem ser pensados até mesmo antes de ir até elas. Visitar uma cachoeira é algo que deve ser bem planejado. Antes de ir a uma, saiba se ela é adequada para banhos, se é possível de ser acessada sozinha ou se necessita de guia. <br /><br />Se você não conhece a região para onde vai, leve alguém que já conheça ou procure um guia para ajudá-lo. Assim você pode aproveitar melhor seu passeio.</p>

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
