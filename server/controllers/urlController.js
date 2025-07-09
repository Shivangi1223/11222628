import Url from "../models/Url.js";
import { nanoid } from "nanoid";

// POST /shorten
export const shortenUrl = async (req, res) => {
  try {
    const { urls } = req.body;
    const result = [];

    for (let url of urls) {
      const shortcode = url.customCode || nanoid(6);

      const newUrl = new Url({
        longUrl: url.longUrl,
        shortcode,
        expiresAt: url.validity
          ? new Date(Date.now() + parseInt(url.validity) * 60000)
          : null,
      });

      await newUrl.save();
      result.push(newUrl);
    }

    res.status(201).json({ data: result });
  } catch (error) {
    console.error("Shorten error:", error);
    res.status(500).json({ message: "Error shortening URLs" });
  }
};

// GET /r/:code
export const redirect = async (req, res) => {
  try {
    const { code } = req.params;
    const url = await Url.findOne({ shortcode: code });

    if (!url) return res.status(404).send("Not Found");

    if (url.expiresAt && new Date() > url.expiresAt) {
      return res.status(410).send("Link Expired");
    }

    url.clicks += 1;
    await url.save();

    res.redirect(url.longUrl);
  } catch (error) {
    res.status(500).send("Server Error");
  }
};

// GET /stats
export const getAllStats = async (req, res) => {
  try {
    const urls = await Url.find().sort({ createdAt: -1 });
    res.status(200).json({ data: urls });
  } catch (error) {
    res.status(500).json({ message: "Error fetching stats" });
  }
};
