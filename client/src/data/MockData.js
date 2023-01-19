import { tokens } from "../theme";

export const mockDataTransactions = [
    {
        id: 1,
        svgpathSend: "M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm7.189-17.98c.314-2.096-1.283-3.223-3.465-3.975l.708-2.84-1.728-.43-.69 2.765c-.454-.114-.92-.22-1.385-.326l.695-2.783L15.596 6l-.708 2.839c-.376-.086-.746-.17-1.104-.26l.002-.009-2.384-.595-.46 1.846s1.283.294 1.256.312c.7.175.826.638.805 1.006l-.806 3.235c.048.012.11.03.18.057l-.183-.045-1.13 4.532c-.086.212-.303.531-.793.41.018.025-1.256-.313-1.256-.313l-.858 1.978 2.25.561c.418.105.828.215 1.231.318l-.715 2.872 1.727.43.708-2.84c.472.127.93.245 1.378.357l-.706 2.828 1.728.43.715-2.866c2.948.558 5.164.333 6.097-2.333.752-2.146-.037-3.385-1.588-4.192 1.13-.26 1.98-1.003 2.207-2.538zm-3.95 5.538c-.533 2.147-4.148.986-5.32.695l.95-3.805c1.172.293 4.929.872 4.37 3.11zm.535-5.569c-.487 1.953-3.495.96-4.47.717l.86-3.45c.975.243 4.118.696 3.61 2.733z",
        tokenSend: "BTC",
        tokenSendAmount: "1.3245",
        svgpathBuy: "M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm7.994-15.781L16.498 4 9 16.22l7.498 4.353 7.496-4.354zM24 17.616l-7.502 4.351L9 17.617l7.498 10.378L24 17.616z",
        tokenBuy: "ETH",
        tokenBuyAmount: "5.3123",
        usdValue: "$21 543.21",
        date: "2020-12-12 12:12:12"
    },
    {
        id: 2,
        svgpathSend: "M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm7.189-17.98c.314-2.096-1.283-3.223-3.465-3.975l.708-2.84-1.728-.43-.69 2.765c-.454-.114-.92-.22-1.385-.326l.695-2.783L15.596 6l-.708 2.839c-.376-.086-.746-.17-1.104-.26l.002-.009-2.384-.595-.46 1.846s1.283.294 1.256.312c.7.175.826.638.805 1.006l-.806 3.235c.048.012.11.03.18.057l-.183-.045-1.13 4.532c-.086.212-.303.531-.793.41.018.025-1.256-.313-1.256-.313l-.858 1.978 2.25.561c.418.105.828.215 1.231.318l-.715 2.872 1.727.43.708-2.84c.472.127.93.245 1.378.357l-.706 2.828 1.728.43.715-2.866c2.948.558 5.164.333 6.097-2.333.752-2.146-.037-3.385-1.588-4.192 1.13-.26 1.98-1.003 2.207-2.538zm-3.95 5.538c-.533 2.147-4.148.986-5.32.695l.95-3.805c1.172.293 4.929.872 4.37 3.11zm.535-5.569c-.487 1.953-3.495.96-4.47.717l.86-3.45c.975.243 4.118.696 3.61 2.733z",
        tokenSend: "BTC",
        tokenSendAmount: "1.3245",
        svgpathBuy: "M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm7.994-15.781L16.498 4 9 16.22l7.498 4.353 7.496-4.354zM24 17.616l-7.502 4.351L9 17.617l7.498 10.378L24 17.616z",
        tokenBuy: "ETH",
        tokenBuyAmount: "5.3123",
        usdValue: "$21 543.21",
        date: "2020-12-12 12:12:12"
    },
    {
        id: 3,
        svgpathSend: "M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm7.189-17.98c.314-2.096-1.283-3.223-3.465-3.975l.708-2.84-1.728-.43-.69 2.765c-.454-.114-.92-.22-1.385-.326l.695-2.783L15.596 6l-.708 2.839c-.376-.086-.746-.17-1.104-.26l.002-.009-2.384-.595-.46 1.846s1.283.294 1.256.312c.7.175.826.638.805 1.006l-.806 3.235c.048.012.11.03.18.057l-.183-.045-1.13 4.532c-.086.212-.303.531-.793.41.018.025-1.256-.313-1.256-.313l-.858 1.978 2.25.561c.418.105.828.215 1.231.318l-.715 2.872 1.727.43.708-2.84c.472.127.93.245 1.378.357l-.706 2.828 1.728.43.715-2.866c2.948.558 5.164.333 6.097-2.333.752-2.146-.037-3.385-1.588-4.192 1.13-.26 1.98-1.003 2.207-2.538zm-3.95 5.538c-.533 2.147-4.148.986-5.32.695l.95-3.805c1.172.293 4.929.872 4.37 3.11zm.535-5.569c-.487 1.953-3.495.96-4.47.717l.86-3.45c.975.243 4.118.696 3.61 2.733z",
        tokenSend: "BTC",
        tokenSendAmount: "1.3245",
        svgpathBuy: "M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm7.994-15.781L16.498 4 9 16.22l7.498 4.353 7.496-4.354zM24 17.616l-7.502 4.351L9 17.617l7.498 10.378L24 17.616z",
        tokenBuy: "ETH",
        tokenBuyAmount: "5.3123",
        usdValue: "$21 543.21",
        date: "2020-12-12 12:12:12"
    },
    {
        id: 4,
        svgpathSend: "M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm7.189-17.98c.314-2.096-1.283-3.223-3.465-3.975l.708-2.84-1.728-.43-.69 2.765c-.454-.114-.92-.22-1.385-.326l.695-2.783L15.596 6l-.708 2.839c-.376-.086-.746-.17-1.104-.26l.002-.009-2.384-.595-.46 1.846s1.283.294 1.256.312c.7.175.826.638.805 1.006l-.806 3.235c.048.012.11.03.18.057l-.183-.045-1.13 4.532c-.086.212-.303.531-.793.41.018.025-1.256-.313-1.256-.313l-.858 1.978 2.25.561c.418.105.828.215 1.231.318l-.715 2.872 1.727.43.708-2.84c.472.127.93.245 1.378.357l-.706 2.828 1.728.43.715-2.866c2.948.558 5.164.333 6.097-2.333.752-2.146-.037-3.385-1.588-4.192 1.13-.26 1.98-1.003 2.207-2.538zm-3.95 5.538c-.533 2.147-4.148.986-5.32.695l.95-3.805c1.172.293 4.929.872 4.37 3.11zm.535-5.569c-.487 1.953-3.495.96-4.47.717l.86-3.45c.975.243 4.118.696 3.61 2.733z",
        tokenSend: "BTC",
        tokenSendAmount: "1.3245",
        svgpathBuy: "M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm7.994-15.781L16.498 4 9 16.22l7.498 4.353 7.496-4.354zM24 17.616l-7.502 4.351L9 17.617l7.498 10.378L24 17.616z",
        tokenBuy: "ETH",
        tokenBuyAmount: "5.3123",
        usdValue: "$21 543.21",
        date: "2020-12-12 12:12:12"
    }
]



export const mockDataTokens = [
    {
        svgpath: "M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm7.189-17.98c.314-2.096-1.283-3.223-3.465-3.975l.708-2.84-1.728-.43-.69 2.765c-.454-.114-.92-.22-1.385-.326l.695-2.783L15.596 6l-.708 2.839c-.376-.086-.746-.17-1.104-.26l.002-.009-2.384-.595-.46 1.846s1.283.294 1.256.312c.7.175.826.638.805 1.006l-.806 3.235c.048.012.11.03.18.057l-.183-.045-1.13 4.532c-.086.212-.303.531-.793.41.018.025-1.256-.313-1.256-.313l-.858 1.978 2.25.561c.418.105.828.215 1.231.318l-.715 2.872 1.727.43.708-2.84c.472.127.93.245 1.378.357l-.706 2.828 1.728.43.715-2.866c2.948.558 5.164.333 6.097-2.333.752-2.146-.037-3.385-1.588-4.192 1.13-.26 1.98-1.003 2.207-2.538zm-3.95 5.538c-.533 2.147-4.148.986-5.32.695l.95-3.805c1.172.293 4.929.872 4.37 3.11zm.535-5.569c-.487 1.953-3.495.96-4.47.717l.86-3.45c.975.243 4.118.696 3.61 2.733z",
        id: 1,
        token: "Bitcoin",
        ticker: "BTC",
        quantity: "1.24",
        share: "50.32%",
        usdValue: "$21 543.21"
    },
    {
        svgpath: "M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm7.994-15.781L16.498 4 9 16.22l7.498 4.353 7.496-4.354zM24 17.616l-7.502 4.351L9 17.617l7.498 10.378L24 17.616z",
        id: 2,
        token: "Ethereum",
        ticker: "ETH",
        quantity: "5.31",
        share: "15.23%",
        usdValue: "$6 432.21"
    },
    {
        svgpath: "M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm1.922-18.207v-2.366h5.414V7.819H8.595v3.608h5.414v2.365c-4.4.202-7.709 1.074-7.709 2.118 0 1.044 3.309 1.915 7.709 2.118v7.582h3.913v-7.584c4.393-.202 7.694-1.073 7.694-2.116 0-1.043-3.301-1.914-7.694-2.117zm0 3.59v-.002c-.11.008-.677.042-1.942.042-1.01 0-1.721-.03-1.971-.042v.003c-3.888-.171-6.79-.848-6.79-1.658 0-.809 2.902-1.486 6.79-1.66v2.644c.254.018.982.061 1.988.061 1.207 0 1.812-.05 1.925-.06v-2.643c3.88.173 6.775.85 6.775 1.658 0 .81-2.895 1.485-6.775 1.657z",
        id: 3,
        token: "USDT",
        ticker: "USDT",
        quantity: "12 021.97",
        share: "11.65%",
        usdValue: "$12 021.97"
    },
    {
        svgpath: "M16 0c8.837 0 16 7.163 16 16s-7.163 16-16 16S0 24.837 0 16 7.163 0 16 0zm8.8 9.568l-1.78 2.77a7.835 7.835 0 01.856 3.595c0 4.4-3.56 7.943-7.943 7.943a7.755 7.755 0 01-3.577-.856l-2.788 1.797c1.797 1.276 3.98 2.049 6.348 2.049 6.029 0 10.933-4.887 10.933-10.933a10.82 10.82 0 00-1.838-6.062l-.211-.303zM15.933 5A10.923 10.923 0 005 15.933c0 2.435.79 4.669 2.133 6.482.52-.94 1.142-1.797 1.864-2.57 0 0 1.075-1.124 1.898-1.695a13.041 13.041 0 017.725-2.52c.798 0 1.572.07 2.333.21l.455.093a5.494 5.494 0 00-5.492-5.492 5.48 5.48 0 00-5.452 5.983l.028.248c-1.377 1.058-2.032 1.88-2.066 1.914a8.049 8.049 0 01-.453-2.636c0-4.4 3.56-7.944 7.943-7.944 1.293 0 2.502.302 3.577.857l2.771-1.797A10.658 10.658 0 0015.933 5zm2.754 11.621c-2.72 0-5.256.874-7.305 2.352a5.458 5.458 0 004.55 2.418 5.482 5.482 0 005.392-4.484 12.434 12.434 0 00-2.637-.286z",
        id: 4,
        token: "ZEN",
        ticker: "ZEN",
        quantity: "120.21",
        share: "15.32%",
        usdValue: "$10 211.78"
    },
    {
        svgpath: "M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16-7.163 16-16 16zm-3.884-17.596L16 10.52l3.886 3.886 2.26-2.26L16 6l-6.144 6.144 2.26 2.26zM6 16l2.26 2.26L10.52 16l-2.26-2.26L6 16zm6.116 1.596l-2.263 2.257.003.003L16 26l6.146-6.146v-.001l-2.26-2.26L16 21.48l-3.884-3.884zM21.48 16l2.26 2.26L26 16l-2.26-2.26L21.48 16zm-3.188-.002h.001L16 13.706 14.305 15.4l-.195.195-.401.402-.004.003.004.003 2.29 2.291 2.294-2.293.001-.001-.002-.001z",
        id: 5,
        token: "BNB",
        ticker: "BNB",
        quantity: "321.123",
        share: "7.32%",
        usdValue: "$3 500.21"
    },
];

export const mockDataContacts = [
    {
        id: 1,
        name: "Jon Snow",
        email: "jonsnow@gmail.com",
        age: 35,
        phone: "(665)121-5454",
        address: "0912 Won Street, Alabama, SY 10001",
        city: "New York",
        zipCode: "10001",
        registrarId: 123512,
    },
    {
        id: 2,
        name: "Cersei Lannister",
        email: "cerseilannister@gmail.com",
        age: 42,
        phone: "(421)314-2288",
        address: "1234 Main Street, New York, NY 10001",
        city: "New York",
        zipCode: "13151",
        registrarId: 123512,
    },
    {
        id: 3,
        name: "Jaime Lannister",
        email: "jaimelannister@gmail.com",
        age: 45,
        phone: "(422)982-6739",
        address: "3333 Want Blvd, Estanza, NAY 42125",
        city: "New York",
        zipCode: "87281",
        registrarId: 4132513,
    },
    {
        id: 4,
        name: "Anya Stark",
        email: "anyastark@gmail.com",
        age: 16,
        phone: "(921)425-6742",
        address: "1514 Main Street, New York, NY 22298",
        city: "New York",
        zipCode: "15551",
        registrarId: 123512,
    },
    {
        id: 5,
        name: "Daenerys Targaryen",
        email: "daenerystargaryen@gmail.com",
        age: 31,
        phone: "(421)445-1189",
        address: "11122 Welping Ave, Tenting, CD 21321",
        city: "Tenting",
        zipCode: "14215",
        registrarId: 123512,
    },
    {
        id: 6,
        name: "Ever Melisandre",
        email: "evermelisandre@gmail.com",
        age: 150,
        phone: "(232)545-6483",
        address: "1234 Canvile Street, Esvazark, NY 10001",
        city: "Esvazark",
        zipCode: "10001",
        registrarId: 123512,
    },
    {
        id: 7,
        name: "Ferrara Clifford",
        email: "ferraraclifford@gmail.com",
        age: 44,
        phone: "(543)124-0123",
        address: "22215 Super Street, Everting, ZO 515234",
        city: "Evertin",
        zipCode: "51523",
        registrarId: 123512,
    },
    {
        id: 8,
        name: "Rossini Frances",
        email: "rossinifrances@gmail.com",
        age: 36,
        phone: "(222)444-5555",
        address: "4123 Ever Blvd, Wentington, AD 142213",
        city: "Esteras",
        zipCode: "44215",
        registrarId: 512315,
    },
    {
        id: 9,
        name: "Harvey Roxie",
        email: "harveyroxie@gmail.com",
        age: 65,
        phone: "(444)555-6239",
        address: "51234 Avery Street, Cantory, ND 212412",
        city: "Colunza",
        zipCode: "111234",
        registrarId: 928397,
    },
    {
        id: 10,
        name: "Enteri Redack",
        email: "enteriredack@gmail.com",
        age: 42,
        phone: "(222)444-5555",
        address: "4123 Easer Blvd, Wentington, AD 142213",
        city: "Esteras",
        zipCode: "44215",
        registrarId: 533215,
    },
    {
        id: 11,
        name: "Steve Goodman",
        email: "stevegoodmane@gmail.com",
        age: 11,
        phone: "(444)555-6239",
        address: "51234 Fiveton Street, CunFory, ND 212412",
        city: "Colunza",
        zipCode: "1234",
        registrarId: 92197,
    },
];

export const mockDataInvoices = [
    {
        id: 1,
        name: "Jon Snow",
        email: "jonsnow@gmail.com",
        cost: "21.24",
        phone: "(665)121-5454",
        date: "03/12/2022",
    },
    {
        id: 2,
        name: "Cersei Lannister",
        email: "cerseilannister@gmail.com",
        cost: "1.24",
        phone: "(421)314-2288",
        date: "06/15/2021",
    },
    {
        id: 3,
        name: "Jaime Lannister",
        email: "jaimelannister@gmail.com",
        cost: "11.24",
        phone: "(422)982-6739",
        date: "05/02/2022",
    },
    {
        id: 4,
        name: "Anya Stark",
        email: "anyastark@gmail.com",
        cost: "80.55",
        phone: "(921)425-6742",
        date: "03/21/2022",
    },
    {
        id: 5,
        name: "Daenerys Targaryen",
        email: "daenerystargaryen@gmail.com",
        cost: "1.24",
        phone: "(421)445-1189",
        date: "01/12/2021",
    },
    {
        id: 6,
        name: "Ever Melisandre",
        email: "evermelisandre@gmail.com",
        cost: "63.12",
        phone: "(232)545-6483",
        date: "11/02/2022",
    },
    {
        id: 7,
        name: "Ferrara Clifford",
        email: "ferraraclifford@gmail.com",
        cost: "52.42",
        phone: "(543)124-0123",
        date: "02/11/2022",
    },
    {
        id: 8,
        name: "Rossini Frances",
        email: "rossinifrances@gmail.com",
        cost: "21.24",
        phone: "(222)444-5555",
        date: "05/02/2021",
    },
];

export const mockTransactions = [
    {
        txId: "01e4dsa",
        user: "johndoe",
        date: "2021-09-01",
        cost: "43.95",
    },
    {
        txId: "0315dsaa",
        user: "jackdower",
        date: "2022-04-01",
        cost: "133.45",
    },
    {
        txId: "01e4dsa",
        user: "aberdohnny",
        date: "2021-09-01",
        cost: "43.95",
    },
    {
        txId: "51034szv",
        user: "goodmanave",
        date: "2022-11-05",
        cost: "200.95",
    },
    {
        txId: "0a123sb",
        user: "stevebower",
        date: "2022-11-02",
        cost: "13.55",
    },
    {
        txId: "01e4dsa",
        user: "aberdohnny",
        date: "2021-09-01",
        cost: "43.95",
    },
    {
        txId: "120s51a",
        user: "wootzifer",
        date: "2019-04-15",
        cost: "24.20",
    },
    {
        txId: "0315dsaa",
        user: "jackdower",
        date: "2022-04-01",
        cost: "133.45",
    },
];

export const mockBarData = [
    {
        country: "AD",
        "hot dog": 137,
        "hot dogColor": "hsl(229, 70%, 50%)",
        burger: 96,
        burgerColor: "hsl(296, 70%, 50%)",
        kebab: 72,
        kebabColor: "hsl(97, 70%, 50%)",
        donut: 140,
        donutColor: "hsl(340, 70%, 50%)",
    },
    {
        country: "AE",
        "hot dog": 55,
        "hot dogColor": "hsl(307, 70%, 50%)",
        burger: 28,
        burgerColor: "hsl(111, 70%, 50%)",
        kebab: 58,
        kebabColor: "hsl(273, 70%, 50%)",
        donut: 29,
        donutColor: "hsl(275, 70%, 50%)",
    },
    {
        country: "AF",
        "hot dog": 109,
        "hot dogColor": "hsl(72, 70%, 50%)",
        burger: 23,
        burgerColor: "hsl(96, 70%, 50%)",
        kebab: 34,
        kebabColor: "hsl(106, 70%, 50%)",
        donut: 152,
        donutColor: "hsl(256, 70%, 50%)",
    },
    {
        country: "AG",
        "hot dog": 133,
        "hot dogColor": "hsl(257, 70%, 50%)",
        burger: 52,
        burgerColor: "hsl(326, 70%, 50%)",
        kebab: 43,
        kebabColor: "hsl(110, 70%, 50%)",
        donut: 83,
        donutColor: "hsl(9, 70%, 50%)",
    },
    {
        country: "AI",
        "hot dog": 81,
        "hot dogColor": "hsl(190, 70%, 50%)",
        burger: 80,
        burgerColor: "hsl(325, 70%, 50%)",
        kebab: 112,
        kebabColor: "hsl(54, 70%, 50%)",
        donut: 35,
        donutColor: "hsl(285, 70%, 50%)",
    },
    {
        country: "AL",
        "hot dog": 66,
        "hot dogColor": "hsl(208, 70%, 50%)",
        burger: 111,
        burgerColor: "hsl(334, 70%, 50%)",
        kebab: 167,
        kebabColor: "hsl(182, 70%, 50%)",
        donut: 18,
        donutColor: "hsl(76, 70%, 50%)",
    },
    {
        country: "AM",
        "hot dog": 80,
        "hot dogColor": "hsl(87, 70%, 50%)",
        burger: 47,
        burgerColor: "hsl(141, 70%, 50%)",
        kebab: 158,
        kebabColor: "hsl(224, 70%, 50%)",
        donut: 49,
        donutColor: "hsl(274, 70%, 50%)",
    },
];

export const mockPieData = [
    {
        id: "hack",
        label: "hack",
        value: 239,
        color: "hsl(104, 70%, 50%)",
    },
    {
        id: "make",
        label: "make",
        value: 170,
        color: "hsl(162, 70%, 50%)",
    },
    {
        id: "go",
        label: "go",
        value: 322,
        color: "hsl(291, 70%, 50%)",
    },
    {
        id: "lisp",
        label: "lisp",
        value: 503,
        color: "hsl(229, 70%, 50%)",
    },
    {
        id: "scala",
        label: "scala",
        value: 584,
        color: "hsl(344, 70%, 50%)",
    },
];


export const mockLineData =
    [
        {
            id: "japan",
            color: tokens("dark").greenAccent[700],
            data: [
                {
                    x: "2018-11-10",
                    y: 101,
                },
                {
                    x: "2018-11-11",
                    y: 75,
                },
                {
                    x: "2018-11-12",
                    y: 36,
                },
                {
                    x: "2018-11-13",
                    y: 216,
                },
                {
                    x: "2018-11-14",
                    y: 35,
                },
                {
                    x: "2018-11-15",
                    y: 236,
                },
                {
                    x: "2018-11-16",
                    y: 88,
                },
                {
                    x: "2018-11-17",
                    y: 232,
                },
            ]
        }
    ]

export const mockGeographyData = [
    {
        id: "AFG",
        value: 520600,
    },
    {
        id: "AGO",
        value: 949905,
    },
    {
        id: "ALB",
        value: 329910,
    },
    {
        id: "ARE",
        value: 675484,
    },
    {
        id: "ARG",
        value: 432239,
    },
    {
        id: "ARM",
        value: 288305,
    },
    {
        id: "ATA",
        value: 415648,
    },
    {
        id: "ATF",
        value: 665159,
    },
    {
        id: "AUT",
        value: 798526,
    },
    {
        id: "AZE",
        value: 481678,
    },
    {
        id: "BDI",
        value: 496457,
    },
    {
        id: "BEL",
        value: 252276,
    },
    {
        id: "BEN",
        value: 440315,
    },
    {
        id: "BFA",
        value: 343752,
    },
    {
        id: "BGD",
        value: 920203,
    },
    {
        id: "BGR",
        value: 261196,
    },
    {
        id: "BHS",
        value: 421551,
    },
    {
        id: "BIH",
        value: 974745,
    },
    {
        id: "BLR",
        value: 349288,
    },
    {
        id: "BLZ",
        value: 305983,
    },
    {
        id: "BOL",
        value: 430840,
    },
    {
        id: "BRN",
        value: 345666,
    },
    {
        id: "BTN",
        value: 649678,
    },
    {
        id: "BWA",
        value: 319392,
    },
    {
        id: "CAF",
        value: 722549,
    },
    {
        id: "CAN",
        value: 332843,
    },
    {
        id: "CHE",
        value: 122159,
    },
    {
        id: "CHL",
        value: 811736,
    },
    {
        id: "CHN",
        value: 593604,
    },
    {
        id: "CIV",
        value: 143219,
    },
    {
        id: "CMR",
        value: 630627,
    },
    {
        id: "COG",
        value: 498556,
    },
    {
        id: "COL",
        value: 660527,
    },
    {
        id: "CRI",
        value: 60262,
    },
    {
        id: "CUB",
        value: 177870,
    },
    {
        id: "-99",
        value: 463208,
    },
    {
        id: "CYP",
        value: 945909,
    },
    {
        id: "CZE",
        value: 500109,
    },
    {
        id: "DEU",
        value: 63345,
    },
    {
        id: "DJI",
        value: 634523,
    },
    {
        id: "DNK",
        value: 731068,
    },
    {
        id: "DOM",
        value: 262538,
    },
    {
        id: "DZA",
        value: 760695,
    },
    {
        id: "ECU",
        value: 301263,
    },
    {
        id: "EGY",
        value: 148475,
    },
    {
        id: "ERI",
        value: 939504,
    },
    {
        id: "ESP",
        value: 706050,
    },
    {
        id: "EST",
        value: 977015,
    },
    {
        id: "ETH",
        value: 461734,
    },
    {
        id: "FIN",
        value: 22800,
    },
    {
        id: "FJI",
        value: 18985,
    },
    {
        id: "FLK",
        value: 64986,
    },
    {
        id: "FRA",
        value: 447457,
    },
    {
        id: "GAB",
        value: 669675,
    },
    {
        id: "GBR",
        value: 757120,
    },
    {
        id: "GEO",
        value: 158702,
    },
    {
        id: "GHA",
        value: 893180,
    },
    {
        id: "GIN",
        value: 877288,
    },
    {
        id: "GMB",
        value: 724530,
    },
    {
        id: "GNB",
        value: 387753,
    },
    {
        id: "GNQ",
        value: 706118,
    },
    {
        id: "GRC",
        value: 377796,
    },
    {
        id: "GTM",
        value: 66890,
    },
    {
        id: "GUY",
        value: 719300,
    },
    {
        id: "HND",
        value: 739590,
    },
    {
        id: "HRV",
        value: 929467,
    },
    {
        id: "HTI",
        value: 538961,
    },
    {
        id: "HUN",
        value: 146095,
    },
    {
        id: "IDN",
        value: 490681,
    },
    {
        id: "IND",
        value: 549818,
    },
    {
        id: "IRL",
        value: 630163,
    },
    {
        id: "IRN",
        value: 596921,
    },
    {
        id: "IRQ",
        value: 767023,
    },
    {
        id: "ISL",
        value: 478682,
    },
    {
        id: "ISR",
        value: 963688,
    },
    {
        id: "ITA",
        value: 393089,
    },
    {
        id: "JAM",
        value: 83173,
    },
    {
        id: "JOR",
        value: 52005,
    },
    {
        id: "JPN",
        value: 199174,
    },
    {
        id: "KAZ",
        value: 181424,
    },
    {
        id: "KEN",
        value: 60946,
    },
    {
        id: "KGZ",
        value: 432478,
    },
    {
        id: "KHM",
        value: 254461,
    },
    {
        id: "OSA",
        value: 942447,
    },
    {
        id: "KWT",
        value: 414413,
    },
    {
        id: "LAO",
        value: 448339,
    },
    {
        id: "LBN",
        value: 620090,
    },
    {
        id: "LBR",
        value: 435950,
    },
    {
        id: "LBY",
        value: 75091,
    },
    {
        id: "LKA",
        value: 595124,
    },
    {
        id: "LSO",
        value: 483524,
    },
    {
        id: "LTU",
        value: 867357,
    },
    {
        id: "LUX",
        value: 689172,
    },
    {
        id: "LVA",
        value: 742980,
    },
    {
        id: "MAR",
        value: 236538,
    },
    {
        id: "MDA",
        value: 926836,
    },
    {
        id: "MDG",
        value: 840840,
    },
    {
        id: "MEX",
        value: 353910,
    },
    {
        id: "MKD",
        value: 505842,
    },
    {
        id: "MLI",
        value: 286082,
    },
    {
        id: "MMR",
        value: 915544,
    },
    {
        id: "MNE",
        value: 609500,
    },
    {
        id: "MNG",
        value: 410428,
    },
    {
        id: "MOZ",
        value: 32868,
    },
    {
        id: "MRT",
        value: 375671,
    },
    {
        id: "MWI",
        value: 591935,
    },
    {
        id: "MYS",
        value: 991644,
    },
    {
        id: "NAM",
        value: 701897,
    },
    {
        id: "NCL",
        value: 144098,
    },
    {
        id: "NER",
        value: 312944,
    },
    {
        id: "NGA",
        value: 862877,
    },
    {
        id: "NIC",
        value: 90831,
    },
    {
        id: "NLD",
        value: 281879,
    },
    {
        id: "NOR",
        value: 224537,
    },
    {
        id: "NPL",
        value: 322331,
    },
    {
        id: "NZL",
        value: 86615,
    },
    {
        id: "OMN",
        value: 707881,
    },
    {
        id: "PAK",
        value: 158577,
    },
    {
        id: "PAN",
        value: 738579,
    },
    {
        id: "PER",
        value: 248751,
    },
    {
        id: "PHL",
        value: 557292,
    },
    {
        id: "PNG",
        value: 516874,
    },
    {
        id: "POL",
        value: 682137,
    },
    {
        id: "PRI",
        value: 957399,
    },
    {
        id: "PRT",
        value: 846430,
    },
    {
        id: "PRY",
        value: 720555,
    },
    {
        id: "QAT",
        value: 478726,
    },
    {
        id: "ROU",
        value: 259318,
    },
    {
        id: "RUS",
        value: 268735,
    },
    {
        id: "RWA",
        value: 136781,
    },
    {
        id: "ESH",
        value: 151957,
    },
    {
        id: "SAU",
        value: 111821,
    },
    {
        id: "SDN",
        value: 927112,
    },
    {
        id: "SDS",
        value: 966473,
    },
    {
        id: "SEN",
        value: 158085,
    },
    {
        id: "SLB",
        value: 178389,
    },
    {
        id: "SLE",
        value: 528433,
    },
    {
        id: "SLV",
        value: 353467,
    },
    {
        id: "ABV",
        value: 251,
    },
    {
        id: "SOM",
        value: 445243,
    },
    {
        id: "SRB",
        value: 202402,
    },
    {
        id: "SUR",
        value: 972121,
    },
    {
        id: "SVK",
        value: 319923,
    },
    {
        id: "SVN",
        value: 728766,
    },
    {
        id: "SWZ",
        value: 379669,
    },
    {
        id: "SYR",
        value: 16221,
    },
    {
        id: "TCD",
        value: 101273,
    },
    {
        id: "TGO",
        value: 498411,
    },
    {
        id: "THA",
        value: 506906,
    },
    {
        id: "TJK",
        value: 613093,
    },
    {
        id: "TKM",
        value: 327016,
    },
    {
        id: "TLS",
        value: 607972,
    },
    {
        id: "TTO",
        value: 936365,
    },
    {
        id: "TUN",
        value: 898416,
    },
    {
        id: "TUR",
        value: 237783,
    },
    {
        id: "TWN",
        value: 878213,
    },
    {
        id: "TZA",
        value: 442174,
    },
    {
        id: "UGA",
        value: 720710,
    },
    {
        id: "UKR",
        value: 74172,
    },
    {
        id: "URY",
        value: 753177,
    },
    {
        id: "USA",
        value: 658725,
    },
    {
        id: "UZB",
        value: 550313,
    },
    {
        id: "VEN",
        value: 707492,
    },
    {
        id: "VNM",
        value: 538907,
    },
    {
        id: "VUT",
        value: 650646,
    },
    {
        id: "PSE",
        value: 476078,
    },
    {
        id: "YEM",
        value: 957751,
    },
    {
        id: "ZAF",
        value: 836949,
    },
    {
        id: "ZMB",
        value: 714503,
    },
    {
        id: "ZWE",
        value: 405217,
    },
    {
        id: "KOR",
        value: 171135,
    },
];