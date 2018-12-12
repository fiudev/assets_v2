import Flickr from "flickr-sdk";
import https from "https";

const { FLICKR_KEY, FLICKR_USER_ID } = process.env;

const flickr = new Flickr(FLICKR_KEY);

class Photos {
  async photos(req, res) {
    try {
      /**
       * Search photos based on tags
       * @param  { search } tag to search
       * @param { page } page to jump to
       * @param { per_page } photos to return
       */

      const { search, page = 1, per_page = 10 } = req.query;

      const payload = await flickr.photos.search({
        text: search,
        user_id: FLICKR_USER_ID,
        per_page,
        page,
        extras: ["original_format", "path_alias", "url_o"]
      });
      const { photos } = JSON.parse(payload.text);

      const gallery = photos.photo;

      const assets = gallery.map(photo => ({
        ...photo,
        src: photo.url_o,
        thumbnail: `https://farm${photo.farm}.staticflickr.com/${
          photo.server
        }/${photo.id}_${photo.secret}.jpg`
      }));

      const gallerySet = {
        currentPage: photos.page,
        overallPages: photos.pages,
        assets
      };

      res.send(gallerySet);
    } catch (err) {
      res.send(err);
    }
  }

  async download(req, res) {
    try {
      const { query } = req;
      https.get(query.src, file => file.pipe(res));
    } catch (e) {
      res.send(e);
    }
  }
}

export default new Photos();
