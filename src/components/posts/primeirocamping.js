import React,{useEffect} from 'react'
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Divider } from '@material-ui/core';
import ImagemCapa from '../../assets/blogImagens/camping8dicas.jpg';
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



export default function PrimeiroCamping() {
    const shareUrl = 'https://aventurei.com/camping-8-dicas-do-primero-camping'
    const title = 'Camping: veja 8 dicas para quem vai acampar pela primeira vez'

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
                <p className="textPost">O Aventurei não é um site apenas com lugares para explorar! Nosso objetivo é incentivar mais pessoas a terem a experiência de acampar e ajudar novos e futuros campistas a se aventurarem pela primeira vez.<br /><br />Para isso separamos aqui 20 dicas quentes e super práticas para quem quer acampar pela primeira vez em um camping estruturado e sem passar perrengue! Confere só:</p>
                <h4 className="subtitlePost">1 - Escolha do camping</h4>
                <p className="textPost">Para sua primeira experiência em acampamentos sugerimos fortemente que você escolha um camping com uma estrutura básica e de preferência que não fique em local completamente isolado para que você não tenha problemas caso esqueça alguma coisa realmente importante ou tiver qualquer problema inesperado. Avalie também se você quer cozinhar, se o camping tem cozinha ou restaurante próximo. Acampar não é necessariamente ficar no ócio (mas pode ser, se você quiser!),  por isso busque um camping que tenha opções de lazer que você curta!</p>
                <h4 className="subtitlePost">2 - Escolha do local</h4>
                <p className="textPost">Na hora que você chegar no camping provavelmente existirá uma infinidade de locais onde você pode colocar sua barraca. Antes de armar procure um local plano e uniforme, sem galhos e raízes no chão. Procure colocar debaixo de uma árvore, para aproveitar um pouco da sombra, mas olhe antes se não é uma árvore frutífera, se não tem uma jaca para cair na sua barraca ou se não tem frutos coloridos que possam manchar ela. Confira também o estado da árvore em si e dos galhos, veja se não estão podres e se correm o risco de cair. Se você ficar em dúvida a dica é simples: pergunte para o dono ou administrador do camping qual é o melhor local, afinal quem está sempre lá sabe onde pega sol, onde alaga, onde tem formigueiros, essas coisas. Não tenha vergonha em pedir ajuda também para outros campistas.</p>
                <h4 className="subtitlePost">3 - Previsão do tempo</h4>
                <p className="textPost">Quando você vai acampar pela primeira vez o ideal é que você não precise encarar chuvas, ventos ou temporais. Claro, alguma hora vai acontecer de você acampar com chuva, é inevitável. E se você tiver uma barraca adequada para acampar na chuva você vai experimentar as coisas boas e ruins de acampar com chuva. Mas um conselho realmente válido é: evite chuva na sua primeira experiência especialmente se sua barraca não for boa. Olhe a previsão do tempo e se planeje para viver a primeira acampada com um tempo bom!</p>
                <h4 className="subtitlePost">4 - Barraca fechada</h4>
                <p className="textPost">Uma dica essencial para quem está acampando pela primeira vez é saber que os mosquitos não terão piedade e se você deixar sua barraca aberta eles vão entrar e transformar sua noite em um inferno. A dica (regra) é simples, básica e válida para sempre: deixe sua barraca (ou a tela de mosquiteiro) sempre fechada! É uma atitude simples: entrou fecha, saiu fecha. Isso evita, além da entrada dos mosquitos, problemas com outros animais (aranhas, formigas, grilos, mariposas) alguns inclusive que podem ter consequências mais sérias.</p>
                <h4 className="subtitlePost">5 - Lanterna</h4>
                <p className="textPost">A lanterna será útil sempre que começar a escurecer. Nem todos campings possuem iluminação na área de barracas, ou nem sempre sua barraca vai estar ao lado dela. Se for investir em uma lanterna opte por uma que possa ser usada na cabeça. Isso torna as coisas mais práticas. Se possível leve até duas, uma de cabeça e uma de mão (para ficar sempre em um bolso da barraca de fácil acesso).</p>
                <h4 className="subtitlePost">6 - Isolante térmico</h4>
                <p className="textPost">Uma coisa super importante e que muitos iniciantes não sabem é que mesmo no verão a temperatura pode cair durante a noite, especialmente a temperatura do solo. Se você prefere um pouco de conforto em vez do isolante você pode optar por um colchão inflável. Que também fará um o isolamento térmico, mas dando um pouco mais de conforto.</p>
                <h4 className="subtitlePost">7 – Kit de primeiros socorros</h4>
                <p className="textPost">Outro item essencial para levar sempre, inclusive em todas as suas aventuras, é um Kit de primeiros socorros. Mas  o mais importante não é você apenas levar ele e sim conhecer cada utensílio que tem dentro dele e saber como e quando usar em um momento de emergência.</p>
                <h4 className="subtitlePost">8 – Montagem da Barraca</h4>
                <p className="textPost">Uma dica super importante é você montar sua barraca em casa, antes de levar ela para o acampamento. Assim você já vai se familiarizando com o equipamento e aproveita para conferir se tudo está certo. Se, mesmo montando sua barraca antes, você tiver dificuldades quando chegar no camping, não se desespere. Faças as coisas com calma e se precisar de ajuda, basta olhar com olhar de “cachorro pidão” para algum campista que já tenha sua barraca montada. Qualquer campista experiente vai ter prazer em ajudar alguém que está começando. E essa é sempre uma ocasião para já fazer novas amizades com os campistas vizinhos.<br/><br/>Por fim, não importa se você é iniciante ou um campista experiente, monte sua barraca direito! Não jogue o sobreteto por cima somente, faça isso com cuidado, prenda todos os pontos de fixação, coloque todos esticadores (cordinhas) e todos os espeques. Sua barraca é o seu lar, trate ela com cuidado!</p>
                
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
