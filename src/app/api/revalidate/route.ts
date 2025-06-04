import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { imageBuilder } from "@/sanity/sanity-shop-utils";
import { getCategoryById } from "@/sanity/sanity-shop-utils";
import { updateIndex } from "@/algolia/crawlIndex";

export async function POST(req: NextRequest) {
  try {
    const { body, isValidSignature } = await parseBody<{
      _type: string;
      slug?: any | undefined;
      _id?: string | undefined;
      name?: string | undefined;
      shortDescription?: string | undefined;
      price?: number | undefined;
      discountedPrice?: number | undefined;
      previewImages?: any[] | undefined;
      reviews?: any[] | undefined;
      category?: any | undefined;
      colors?: any[] | undefined;
      sizes?: any[] | undefined;
      thumbnails?: any[] | undefined;
      status?: string | undefined;
      description?: string | undefined;
      offers?: any[] | undefined;
      customAttributes?: any[] | undefined;
      _createdAt?: string | undefined;
      _updatedAt?: string | undefined;
      tags?: any[] | undefined;
    }>(req, process.env.SANITY_HOOK_SECRET);

    if (!isValidSignature) {
      return new Response("Invalid Signature", { status: 401 });
    }

    if (!body?._type) {
      return new Response("Bad Request", { status: 400 });
    }

    revalidateTag(body._type);
    const category = await getCategoryById(body?.category?._ref);

    const data = {
      type: "products",
      name: body?.name || "",
      htmlString: body?.shortDescription?.slice(0, 7000) || "",
      objectID: `${process.env.SITE_URL}/products/${body?.slug?.current}`,
      url: `${process.env.SITE_URL}/products/${body?.slug?.current}`,
      imageURL:
        body?.previewImages &&
        (imageBuilder(body?.previewImages[0]?.image).url() as string),
      price: body?.price,
      discountedPrice: body?.discountedPrice,
      reviews: body?.reviews,
      category: category?.title,
      colors: body?.colors,
      sizes: body?.sizes,
      _id: body?._id,
      thumbnails: body?.thumbnails,
      status: body?.status,
      previewImages: body?.previewImages,
      description: body?.description,
      offers: body?.offers,
      customAttributes: body?.customAttributes,
      updatedAt: new Date().toISOString(),
      tags: body?.tags,
    };

    if (body.name !== "" || body?.name === undefined) {
      await updateIndex(data);
    }

    return NextResponse.json({
      status: 200,
      revalidated: true,
      now: Date.now(),
      body,
    });
  } catch (error: any) {
    console.error(error);
    return new Response(error.message, { status: 500 });
  }
}
