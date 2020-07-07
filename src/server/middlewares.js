import { Provider } from 'react-redux';
import { compose } from 'redux';
import { StaticRouter } from 'react-router-dom';
import { renderToString } from 'react-dom/server';



export const logger = (req, res, next) => {
    console.log(`Request: ${req.method} request for '${req.url}'`);
    next();
};

export const addStoreToRequestPipeline = (serverStore)=>(req, res, next) => {
    req.store = serverStore;
    next();
};

const buildHTMLPage = ({html, state}) => `
<!DOCTYPE html>
<html>
    <head>
        <meta name="viewport" content="minimum-scale=1.0, width=device-width, maximum-scale=1.0, user-scalable=no" />
        <meta charset="utf-8">
        <title>Kids Gardens</title>
        <style>${staticCSS}</style>
        <style>${mystaticCSS}</style>
        
    </head>
    <body>
        <div id="react-container" >${html}</div>
        <script>
            window.__INITIAL_STATE__ = ${JSON.stringify(state)}
        </script>
        <script src="/bundle.js"></script>
        <script>${staticJQ}</script>
        <script>${staticJS}</script>
        
    </body>
</html>
`;

const renderComponentsToHTML = ({url, store}) =>({
        state: store.getState(),
        html: renderToString(
            <Provider store={store}>
                <StaticRouter location={url} context={{}}>
                    <App />
                </StaticRouter>
            </Provider>
        )
    });

const makeClientStoreFrom = (url, serverStore) =>
    ({
        url,
        store: storeFactory(false, serverStore.getState())
    });

const htmlResponse=compose(
    buildHTMLPage,
    renderComponentsToHTML,
    makeClientStoreFrom
);

export const respond =(serverStore)=> ({url}, res) =>
    res.status(200).send(
      htmlResponse(url, serverStore)
    );


    