function transformLinkToEmbed(link){
    if(!link.includes("=")) return link;
    
    const youtubeOfficialLink = 'https://www.youtube.com/embed/'
    // Match everything after "=" character,  to get only video ID. Regex=>  /(?<=\=).*/g
    const youtubeClipId = link.match(/(?<=\=).*/g)[0]
    const validEmbedLink = youtubeOfficialLink.concat(youtubeClipId);

    return validEmbedLink;
}

module.exports=transformLinkToEmbed;