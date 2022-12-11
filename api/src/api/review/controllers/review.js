"use strict";

/**
 * review controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::review.review", ({ strapi }) => ({
  async create(ctx, next) {
    const user = ctx.state.user;
    const { shopId, review, username, score, tags } = ctx.request.body.data;
    const userReview = await strapi.entityService.create("api::review.review", {
      data: {
        shopId,
        review,
        username,
        score,
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
