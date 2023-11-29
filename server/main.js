import { Meteor } from "meteor/meteor";
import "/imports/startup/server";
import { WebApp } from "meteor/webapp";

Meteor.startup(() => {
  // code to run on server at startup
});

// SEO BELOW
// making routes and building headers for crawlers & bots.

const text =
  "Vous êtes invité.e.s à venir jouer à l'ordinateur ce vendredi 1er Décembre 2023 à la Belonne (Bruxelles), 17H45.";

const serverRendering = (req, res, next) => {
  // can get the useragent this way
  rootUrl = "https://tryhard.samuel.ovh";
  timestamp = new Date();
  path = req.url;
  console.log("serverRendering launching ", req.headers["user-agent"]);
  console.log(
    timestamp.getHours() +
      ":" +
      timestamp.getMinutes() +
      ":" +
      timestamp.getSeconds()
  );
  // console.log("full REQ ", req)
  // console.log("REQ url ", req.url)
  // console.log("which path svp? ", path)
  // console.log("which title svp? ", path.substring(1))
  // i guess i can get the URL this way?
  try {
    const ua = req.headers["user-agent"];

    if (
      /bot|curl|whatsapp|facebook|twitter|pinterest|google|baidu|bing|msn|duckduckgo|teoma|slurp|yandex/i.test(
        ua
      )
    ) {
      if (req.url !== "/") {
        console.log("not accessing root");
        // path = req.url;
        // console.log(
        //   "page req url : ",
        //   path,
        //   " and substr : ",
        //   path.substring(1)
        // );
        titre = "Tryhard";
      } else {
        // show page 1 preview for root
        console.log("accessing root!");
        titre = "Tryhard";
      }

      // console.log("THATS A BOT, user agent : ", ua)
      // Send any non matches forward
      // if (!pathName.includes('/'))
      // {
      // 	console.log("don't know what should be happening here")
      //   next();
      // }

      //   if(/facebook/i.test(ua)){
      //   	//facebook motherfuckers
      //    const html = `
      //      <!html>
      //      <head>
      //        <title>la bd de samuel</title>
      //        <meta property="og:image" content="${rootUrl}/preview/32.jpg"/>
      //        <meta property="og:image:url" content="${rootUrl}/preview/32.jpg"/>
      //        <meta property="og:image:secure_url" content="${rootUrl}/preview/32.jpg"/>
      //        <meta property="og:image:type" content="image/jpeg"/>
      //        <meta property="og:image:width" content="643" />
      // <meta property="og:image:height" content="643" />
      //        <meta property="og:url" content=${rootUrl}/>
      //        <meta property="og:type" content="website"/>
      //        <meta property="og:description" content="J'ai fait une bd qui
      //        parle des six mois que j'ai passés à Valenciennes,
      //        dans le nord de la France."/>
      //        <meta property="og:title" content="la bd de samuel"/>
      //    `;

      //    res.statusCode = 200;
      //    res.setHeader('Content-Type', 'text/html');
      //    res.end(html);

      //   }else{
      const html = `
		        <!html>
		        <head>
		          <title>${titre} @ la Belonne</title>
		          <meta property="og:image" content="${rootUrl}/preview/${titre}.jpg"/>
		          <meta property="og:image:url" content="${rootUrl}/preview/${titre}.jpg"/>
		          <meta property="og:image:secure_url" content="${rootUrl}/preview/${titre}.jpg"/>
		          <meta property="og:image:type" content="image/jpg"/>
		          <meta property="og:image:width" content="643" />
					<meta property="og:image:height" content="643" />
		          <meta property="og:url" content=${rootUrl}/>
		          <meta property="og:type" content="website"/>
		          <meta property="og:description" content="${text}"/>
		          <meta property="og:title" content="${titre} @ la Belonne"/>
		      `;

      res.statusCode = 200;
      res.setHeader("Content-Type", "text/html");
      res.end(html);
      // }
    } else {
      //   console.log("not a bot, carry on")
      next();
    }
  } catch (err) {
    // console.log(err);
  }
};

// attach the handler to webapp
WebApp.connectHandlers.use(serverRendering);
