import "../utils/setup";
import { assert } from "chai";
import { suite, test } from "mocha";
import { mainAPI } from "../utils/constants";

suite("Generating fulfillment data", () => {
  test(`Generate fulfillment data for listing`, async () => {
    const order = await mainAPI.getOrder({
      protocol: "seaport",
      side: "ask",
    });

    if (order.orderHash == null) {
      return;
    }

    const fulfillment = await mainAPI.generateFulfillmentData(
      "0x000000000000000000000000000000000000dEaD",
      order.orderHash,
      order.protocolAddress,
      order.side
    );

    assert.exists(fulfillment.fulfillment_data.orders[0].signature);
  });

  test(`Generate fulfillment data for offer`, async () => {
    const order = await mainAPI.getOrder({
      protocol: "seaport",
      side: "bid",
    });

    if (order.orderHash == null) {
      return;
    }

    const fulfillment = await mainAPI.generateFulfillmentData(
      "0x000000000000000000000000000000000000dEaD",
      order.orderHash,
      order.protocolAddress,
      order.side
    );

    assert.exists(fulfillment.fulfillment_data.orders[0].signature);
  });
});
