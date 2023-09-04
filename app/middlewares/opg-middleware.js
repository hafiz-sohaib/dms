const ogs = require('open-graph-scraper');

exports.openGraphMiddleware = async (request, response, next) => {
    try {
        const url = request.body.opportunity_url;
        const { result } = await ogs({ url });
        const { ogTitle, ogDescription, ogImage } = result;
        response.locals.openGraph = {
            title: ogTitle || 'Default Title',
            description: ogDescription || 'Default Description',
            image: ogImage ? ogImage[0].url : 'URL to your default thumbnail image',
            url,
        };
        next();
    } catch (error) {
        console.error('Error fetching Open Graph data:', error);
    }
};