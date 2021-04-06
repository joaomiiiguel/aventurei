import React, {useEffect, useState } from 'react';
import './ListAventuras.css';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Box, InputBase, Card, CardActionArea, Divider, Button, Typography, CardMedia, CardContent, Link } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import Modal from "@material-ui/core/Modal";
import NearMeRoundedIcon from '@material-ui/icons/NearMeRounded';
import StarIcon from '@material-ui/icons/Star';
import InstagramIcon from '@material-ui/icons/Instagram';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import 'photoswipe/dist/photoswipe.css'
import 'photoswipe/dist/default-skin/default-skin.css';
import ReactGA from 'react-ga'

import { Gallery, Item } from 'react-photoswipe-gallery'

export default function ListAventuras(props) {
    //const estados = ["Brasil", "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];
    //const [selectedIndex, setSelectedIndex] = useState(0);
    const [search, setSearch] = useState('');
    const [idBtn, setidBtn] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    const aventurasApi = [
        {
            id: 1,
            title: "Rapel na Cachoeira do Roncador",
            entrada: "R$45",
            description: "Um dos destinos de ecoturismo mais procurados da região é a cachoeira do Roncador, localizada entre os municípios de Bananeiras e Borborema. A cachoeira que faz parte da Área de Preservação Ambiental Roncador tem aproximadamente 40 metros de altura e quedas d’água vindo do Rio Bananeiras. A melhor época do ano para usufruir desse refúgio encantador é entre maio e agosto quando a cachoeira aumenta seu volume. Para ir a cachoeira o melhor acesso é por Pirpirituba e de lá pegar uma estrada de barro que segue por uns 10km até o Roncador e assim fazer uma caminhada por uma trilha leve de mais ou menos 1km.",
            linkMaps: "https://goo.gl/maps/Fbhog7r8dwsM6ibt7",
            cidade: "Bananeiras",
            dificuldade: "Moderada",
            avaliation: "4.5",
            uf: "PB",
            like: true,
            imgCapa: require("../../../assets/localFotos/thumbnail/000001-01.png"),
            imgCapa2: require("../../../assets/localFotos/thumbnail/000001-02.png"),
            imgFoto1: require("../../../assets/localFotos/000001-01.png"),
            imgFoto2: require("../../../assets/localFotos/000001-02.png"),
            partner_name: "Família Adventure",
            partner_insta: "familia_adventure_pb",
            partner_whats: "83999716493",
        },
        {
            id: 2,
            title: "Rapel na Pedra da Boca",
            entrada: "Gratuito",
            description: "Com uma área de 160 hectares, e situado na zona rural da cidade de Araruna, a Pedra da Boca chama atenção pelas belas paisagens. Uma das pedras tem cerca de 330 metros de altura, o local é ideal para a prática de rapel, escalada, caminhadas e acampamento. A região é apontada como o melhor local para voos de longa distância de asa delta e parapente, onde aconteceu recordes sul-americano e mundial.",
            linkMaps: "https://goo.gl/maps/Fbhog7r8dwsM6ibt7",
            cidade: "Araruna",
            dificuldade: "Difícil",
            avaliation: "4.8",
            uf: "PB",
            like: true,
            imgCapa: require("../../../assets/localFotos/thumbnail/000002-01.png"),
            imgCapa2: require("../../../assets/localFotos/thumbnail/000002-02.png"),
            imgFoto1: require("../../../assets/localFotos/000002-01.png"),
            imgFoto2: require("../../../assets/localFotos/000002-02.png"),
            partner_name: "Família Adventure",
            partner_insta: "familia_adventure_pb",
            partner_whats: "83999716493",
        },
        {
            id: 3,
            title: "Passeio na Praia do Guaju",
            entrada: "Gratuito",
            description: "Essa praia fica localizada na divisa entre os estados da Paraíba e o Rio Grande do Norte, está situada na cidade de Mataraca. O melhor acesso é por Sagi(RN) que fica a 2km da praia, a praia é acessível somente com buggy, 4x4 ou a pé. O rio Guaju tem uma beleza diferencial, onde é possível fazer passeio de barco pelo mangue, esquibunda nas dunas e tirolesa. E ainda comer espetinho de lagosta.",
            linkMaps: "https://goo.gl/maps/Fbhog7r8dwsM6ibt7",
            cidade: "Mataraca",
            dificuldade: "Moderada",
            avaliation: "4.5",
            uf: "PB",
            like: true,
            imgCapa: require("../../../assets/localFotos/thumbnail/000003-01.png"),
            imgCapa2: require("../../../assets/localFotos/thumbnail/000003-02.png"),
            imgFoto1: require("../../../assets/localFotos/000003-01.png"),
            imgFoto2: require("../../../assets/localFotos/000003-02.png"),
            partner_name: "João Miguel",
            partner_insta: "joaomiiiguel",
            partner_whats: "83981390385",
        },
        {
            id: 4,
            title: "Rapel na Cachoeira Véu da Noiva",
            entrada: "R$120",
            description: "Bonito Pernambucana: Essas cachoeiras foram eleitas em um concurso como uma das 7 maravilhas de Pernambuco.A cidade tem clima ameno e oferece um dos melhores roteiros de ecoturismo do Estado, localizada a 140 km do Recife, é a maior e mais procurada de Bonito. Ela tem 32 metros de altura e é a parada perfeita para quem gosta de esportes radicais, pois ali você pode praticar tirolesa e rapel. Apesar de ser um local de difícil acesso, se você gosta de tranquilidade é bom evitar a cachoeira aos finais de semana e feriados, quando ela está cheia de turistas. Mesmo assim, essa beleza não pode ficar fora do seu roteiro!",
            linkMaps: "https://goo.gl/maps/61nDUyXhhATZDnFy8",
            cidade: "Bonito",
            dificuldade: "Moderada",
            avaliation: "4.8",
            uf: "PE",
            like: true,
            imgCapa: require("../../../assets/localFotos/thumbnail/000004-01.png"),
            imgCapa2: require("../../../assets/localFotos/thumbnail/000004-02.png"),
            imgFoto1: require("../../../assets/localFotos/000004-01.png"),
            imgFoto2: require("../../../assets/localFotos/000004-02.png"),
            partner_name: "Extreme Esportes",
            partner_insta: "extremeesportes",
            partner_whats: "81998714319",
        },
        {
            id: 5,
            title: "Rapel na Serra-do-Pará",
            entrada: "R$150",
            description: "A Serra-do-Pará está localizada no Maciço da Borborema nas proximidades da Vila do Pará, distrito de Santa Cruz do Capibaribe com predomínio da caatinga arbustiva no agreste setentrional de Pernambuco. A sua unidade litoestratigráfica Neoproterozóico Complexo Surubim-Caroalina é composta por xistos, gnaisses, quartzitos e metacarbonatos. Seu eixo está orientado na direção leste/oeste, com altitude de aproximadamente 750m e altura de 210m em relação ao distrito do Pará, do seu alto tem-se uma visão panorâmica da região.Seu trecho mais alto é conhecido como Pedra do Pará, com aproximadamente 300 metros de extensão e 5000m2 de área, onde é possível visualizar uma Furna e o Sítio Arqueológico do Pará.",
            linkMaps: "https://goo.gl/maps/hCAGf2JMttrJpdSRA",
            cidade: "Santa Cruz do Capibaribe",
            dificuldade: "Moderada",
            avaliation: "4.8",
            uf: "PE",
            like: true,
            imgCapa: require("../../../assets/localFotos/thumbnail/000005-01.png"),
            imgCapa2: require("../../../assets/localFotos/thumbnail/000005-02.png"),
            imgFoto1: require("../../../assets/localFotos/000005-01.png"),
            imgFoto2: require("../../../assets/localFotos/000005-02.png"),
            partner_name: "Extreme Esportes",
            partner_insta: "extremeesportes",
            partner_whats: "81998714319",
        },
        {
            id: 6,
            title: "Rapel na Pedra Furada",
            entrada: "R$150",
            description: "Localizada no município de Venturosa, a Pedra Furada é uma das mais belas paisagens da região. A região faz parte do pólo Buíque/Pesqueira/Venturosa que é um dos sete pólos de ecoturismo de Pernambuco apresentado pela Embratur. Em 1985, a Prefeitura de Venturosa construiu o Parque Pedra Furada que dispõe de infra-estrutura básica. Situada em um parque municipal, seu acesso é feito por uma trilha com escadaria (351 degraus). O mirante oferece paisagens de grande beleza.A cidade possui também outros sítios arqueológicos de grande valor histórico-científico, como a pedra do Tubarão, onde foram descobertos um cemitério de índios pré-históricos; Peri-peri ou Morro dos Ossos, formados por dois grandes blocos de granito, que afloram em meio a uma planície e que possuem em suas paredes inúmeras pinturas rupestres.",
            linkMaps: "https://goo.gl/maps/yLrUgKKPZazviKhp6",
            cidade: "Venturosa",
            dificuldade: "Moderada",
            avaliation: "4.8",
            uf: "PE",
            like: true,
            imgCapa: require("../../../assets/localFotos/thumbnail/000006-01.png"),
            imgCapa2: require("../../../assets/localFotos/thumbnail/000006-02.png"),
            imgFoto1: require("../../../assets/localFotos/000006-01.png"),
            imgFoto2: require("../../../assets/localFotos/000006-02.png"),
            partner_name: "Extreme Esportes",
            partner_insta: "extremeesportes",
            partner_whats: "81998714319",
        },
        {
            id: 7,
            title: "Rapel Pontilhão Cascavel",
            entrada: "R$100",
            description: "O rapel no Pontilhão Cascavel, com 50 metros de altura, é uma das atividades de aventura mais procuradas. Localizada num vale em meio a colinas e montes, a ponte foi construída para uma estrada de ferro hoje abandonada. Uma trilha curta leva o aventureiro para cima da ponte, onde se monta a ancoragem do rapel. A descida é toda feita em negativo e, além da aventura em si, a vista é deslumbrante. Apesar da altura, esse rapel é indicado para iniciantes devido ao baixo grau de dificuldade. A atividade pode incluir também a caminhada de uma hora pelos trilhos da antiga linha férrea, passando por dois túneis.",
            linkMaps: "https://g.page/pontilhaocascavelgravata?share",
            cidade: "Gravatá",
            dificuldade: "Moderada",
            avaliation: "4.8",
            uf: "PE",
            like: true,
            imgCapa: require("../../../assets/localFotos/thumbnail/000007-01.png"),
            imgCapa2: require("../../../assets/localFotos/thumbnail/000007-02.png"),
            imgFoto1: require("../../../assets/localFotos/000007-01.png"),
            imgFoto2: require("../../../assets/localFotos/000007-02.png"),
            partner_name: "Extreme Esportes",
            partner_insta: "extremeesportes",
            partner_whats: "81998714319",
        },
        {
            id: 8,
            title: "Voo de Paramotor pela Praia",
            entrada: "R$325",
            description: "O Paramotor é considerado uma adaptação do parapente. Para voar, os parapentes necessitam uma velocidade de vento que supera os 20 km/h dependendo do tipo de vela, esta velocidade se consegue graças ao vento que se gera ao correr nas costas. O paramotor, essa velocidade de vento se gera graças a força que proporciona o motor que leva as costas no momento em que se supera a velocidade necessária para se levantar. Enquanto que em um parapente se requer uma certa altura para poder voar, com o paramotor se pode levantar voo praticamente de qualquer lugar plano. Os voos podem ser feitos de duas localidades, Jaboatão(18 km da capital) e em Ipojuca (43km ao sul de Recife). O tempo de voo em nossa experiência é de 10 a 15min e temos os requisitos de 40kg como peso mínimo e o peso máximo é de 120kg para a prática do voo.",
            linkMaps: "https://goo.gl/maps/PJgCvMCRWbb1RMky9",
            cidade: "Ipojuca",
            dificuldade: "Moderada",
            avaliation: "4.8",
            uf: "PE",
            like: true,
            imgCapa: require("../../../assets/localFotos/thumbnail/000008-01.png"),
            imgCapa2: require("../../../assets/localFotos/thumbnail/000008-02.png"),
            imgFoto1: require("../../../assets/localFotos/000008-01.png"),
            imgFoto2: require("../../../assets/localFotos/000008-02.png"),
            partner_name: "Extreme Esportes",
            partner_insta: "extremeesportes",
            partner_whats: "81998714319",
        },
    ]

    useEffect(() => {
        
      });

    const useStyles = makeStyles({
        root: {
            display: "flex",
            justifyContent: "center",
            margin: 10,
            borderRadius: 15,
            
        },
        media: {
            height: 'auto',
            width: '100%',

        },
        title: {
            color: '#0F5045',
            fontWeight: 'bold',
            height: 70,
            alignItems:'center'
        },
        CardContent: {
            width: '100%',
            position: 'absolute',
            bottom: 0,
            background: 'linear-gradient(0deg, rgba(0,0,0,1) 10%, rgba(0,0,0,0) 100%)'
        },
        flexRow: {
            display: 'flex',
            alignItems: 'center'
        },
        formControl: {
            margin: 2,
            minWidth: 120,
        },

        button: {
            marginTop: 15,
            width: '100%',
            backgroundColor: '#0F5045',
            color: 'white',
            '&:hover': {
                backgroundColor: '#157e6c',
              },
        }
        

    });
    const classes = useStyles();

    const handleOpenModal = (place) => {
        setidBtn(place);
        setOpenModal(true);
        ReactGA.event({
            category: 'Button',
            action: 'Abrir modal de detalhes',
          })
    };

    const handleClose = () => {
        setOpenModal(false);
    };

    const filteredLocal = aventurasApi.filter( place =>{
        return place.title.includes(search)
    })
    

    const ListaCards = filteredLocal.map((place) =>
        <div style={{ width: '95%', maxWidth: 400 }} key={place.id}>
            <Card className={classes.root} onClick={() => handleOpenModal(place)}>
                <CardActionArea>
                    <CardMedia
                        component="img"
                        className={classes.media}
                        image={place.imgCapa}
                        title={place.title}
                    />
                    <CardContent>
                        <Typography className={classes.title} variant="h5">
                            {place.title}
                        </Typography>
                        <Box className={classes.flexRow}>
                            <RoomOutlinedIcon fontSize="small" style={{ color: "gray" }} />
                            <Typography variant="body2" color="textSecondary" component="p">
                                {place.cidade} - {place.uf}
                            </Typography>
                        </Box>
                    </CardContent>
                </CardActionArea>

            </Card>
        </div>
    );


    
    return (
        <div className="container-ListAdv" >

            <div className="buscaAventura">
                <p className="tituloBranco">EXPLORE NOVAS AVENTURAS</p>
                <p>Encontre informações para sua próxima aventura.</p>
                <div className="contanierBuscar">
                    <div className="Advsearch">
                        <InputBase
                            className="TextSearch"
                            placeholder="Estou procurando por…"
                            size="large"
                            onChange={ event => setSearch(event.target.value)}
                        />
                        <div className="searchIcon">
                            <SearchIcon />
                        </div>
                    </div>


                    {/**Modal com detalhes do lugar 
                    <div className="formBottom">
                        <select className="custom-select" >
                            {estados.map((option, index) => (
                                <option
                                    className="optionItem"
                                    key={option}
                                    value={index === selectedIndex}
                                    onClick={event => setSelectedIndex(event.target.value)}
                                >
                                    {option}
                                </option>
                            ))}
                        </select>
                    </div>
                    */}

                </div>
            </div>

            <div className="listaAventura">
                {ListaCards}
                
            </div>
            <p className="novoLugar">Quer indicar algum lugar? <Link href="/seja-nosso-guia"><p className="btnIndicar">Clique aqui...</p></Link></p>
            {/**Modal com detalhes do lugar */}
            <Modal open={openModal} onClose={handleClose} >
                <Grid className="ModalContainer">

                    <Grid className="containerLocal">
                        <Grid style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                            <ArrowBackIcon className="btnBack"  onClick={handleClose} />
                            <div className="titleLocal">
                                <h2>{idBtn.title}</h2>
                                <div style={{ display: "flex", flexDirection: "row", color: "gray" }}><RoomOutlinedIcon fontSize="small" /><p style={{ color: "gray", fontSize: '13pt' }}>{idBtn.cidade} - {idBtn.uf}</p></div>
                            </div>

                        </Grid>

                        <Divider />

                        <div className="localInfos">
                            <div className="nivelAcesso">
                                <h4 style={{ color: "gray" }}>Dificuldade</h4>
                                <h4>{idBtn.dificuldade}</h4>
                            </div>
                            <div className="entradaPreco">
                                <h4 style={{ color: "gray" }}>Acesso</h4>
                                <h4>{idBtn.entrada}</h4>
                            </div>
                            <div className="avaliacaoLocal">
                                <h4 style={{ color: "gray" }}>Avaliação</h4>
                                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                                    <StarIcon />
                                    <h3>{idBtn.avaliation}</h3>
                                </div>

                            </div>
                        </div>

                        <div className="descricaoLugar">
                            <h3>Descrição do Lugar</h3>
                            <Typography variant="body2" gutterBottom style={{ marginTop: 10, marginBottom: 10 }}>{idBtn.description}</Typography>
                        </div>
                        <Grid style={{ width: '100%', marginTop: 10 }}>
                            <h3>Fotos</h3>
                            <Gallery >
                                <Item
                                    original={idBtn.imgFoto1}
                                    thumbnail={idBtn.imgCapa}
                                    width="1024"
                                    height="564"

                                >
                                    {({ ref, open }) => (
                                        <img alt="Foto local" ref={ref} onClick={open} src={idBtn.imgCapa} className="PhotoThumb" />
                                    )}
                                </Item>
                                <Item
                                    original={idBtn.imgFoto2}
                                    thumbnail={idBtn.imgCapa2}
                                    width="1024"
                                    height="564"

                                >
                                    {({ ref, open }) => (
                                        <img alt="Foto local" ref={ref} onClick={open} src={idBtn.imgCapa2} className="PhotoThumb" />
                                    )}
                                </Item>


                            </Gallery>
                        </Grid>
                        <Link href={idBtn.linkMaps} target="_blank" rel="noreferrer" underline="none">
                            <Button
                                variant="contained"
                                className={classes.button}
                                endIcon={<NearMeRoundedIcon />}
                            >
                                Visualizar Rota
                            </Button>
                        </Link>

                        <Divider style={{ marginTop: 15 }} />
                        <div className="colaboradorContainer">
                            <div style={{ width:'100%', display: "flex", flexDirection: "column", textAlign: 'center'}}>
                                <h3> {idBtn.partner_name}</h3>
                                <h5 style={{marginBottom:5}}>Guia Aventurei</h5>
                                <p style={{ color: "gray", fontSize:'10pt', marginTop:5 }}>Contato:</p>
                                <div style={{ display: "flex", flexDirection: "row", justifyContent:'space-between' }}>
                                    <Link href={`https://www.instagram.com/${idBtn.partner_insta}/`} target="_blank" rel="noreferrer" underline="none" style={{ display: "flex", flexDirection: "row", color: "gray", width:'45%' }}><Button variant="contained" className={classes.button} startIcon={<InstagramIcon />}>Instagram</Button></Link>
                                    <Link href={`https://api.whatsapp.com/send?phone=55${idBtn.partner_whats}/`} target="_blank" rel="noreferrer" underline="none" style={{ display: "flex", flexDirection: "row", color: "gray", width:'45%' }}><Button variant="contained" className={classes.button} startIcon={<WhatsAppIcon />}>WhatsApp</Button></Link>
                                </div>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Modal>

        </div>
    )
}


