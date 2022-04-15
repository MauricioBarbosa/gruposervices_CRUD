import Document, {Html, Head, Main, NextScript} from "next/document";

export default class MyDocument extends Document{
    /**
     * This function import files into head
     */
    render():JSX.Element{
        return (
            <Html>
                <Head>
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
                    />
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com"/>
                    <link href="https://fonts.googleapis.com/css2?family=Lato&display=swap" rel="stylesheet"/>
                    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap" rel="stylesheet" />
                    <link href="https://fonts.googleapis.com/css2?family=Ubuntu:wght@300&display=swap" rel="stylesheet"/> 
                    <body>
                            <Main/>
                            <NextScript/>
                    </body>
                </Head>
            </Html>
        )
    }
}