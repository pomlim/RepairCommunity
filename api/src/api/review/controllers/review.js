"use strict";

/**
 * review controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::review.review", ({ strapi }) => ({
  async create(ctx, next) {
    const user = ctx.state.user;
    const { shop, review, username, score, tags, images } =
      ctx.request.body.data;
    const userReview = await strapi.entityService.create("api::review.review", {
      data: {
        shop,
        review,
        username,
        score,
        images,
      },
    });

    await Promise.all(
      tags.map(async (tag) => {
        const tag_link = await strapi.entityService.create(
          "api::review-tag-link.review-tag-link",
          {
            data: {
              review: userReview.id,
              review_tag: tag,
            },
          }
        );
      })
    );

    return { userReview };
  },
}));
