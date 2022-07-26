import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../../db/prisma";

const getUrl = async (req: NextApiRequest, res: NextApiResponse) => {
  const slug = req.query["slug"];

  if (!slug || typeof slug !== "string") {
    res.statusCode = 404;
    res.send(JSON.stringify({ message: "slug is undefined" }));

    return;
  }

  const data = await prisma.shortLink.findFirst({
    where: {
      slug: {
        equals: slug!,
      },
    },
  })!;

  if (!data || data?.url === null) {
    res.statusCode = 404;
    res.send(JSON.stringify({ message: "Link not found" }));

    return;
  }

  return res.json({ data });
};

export default getUrl;
