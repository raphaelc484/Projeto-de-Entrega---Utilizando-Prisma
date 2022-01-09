import { Router } from "express";
import { ensureAuthenticateClients } from "./middlewares/ensureAuthenticateClients";
import { ensureAuthenticateDeliveryman } from "./middlewares/ensureAuthenticateDeliveryman";
import { AutheticateClientController } from "./modules/account/authenticateClient/AuthenticateClientController";
import { AuthenticateDeliverymanController } from "./modules/account/authenticateDeliveryman/AuthenticateDeliverymanController";
import { CreateClientController } from "./modules/clients/createClient/CreateClientController";
import { FindAllDeliveriesController } from "./modules/clients/deliveries/FindAllDeliveriesController";
import { CreateDeliveryController } from "./modules/deliveries/createDelivery/CreateDeliveryController";
import { FindAllAvailableController } from "./modules/deliveries/findAllAvailable/FindAllAvailableController";
import { UpdateDeliverymanController } from "./modules/deliveries/updateDeliveryman/UpdateDeliverymanController";
import { UpdateEndDateController } from "./modules/deliveries/updateEndDate/UpdateEndDateController";
import { CreateDeliverymanController } from "./modules/deliveryman/createDeliveryman/CreateDeliverymanController";
import { FindAllDeliveriesDeliverymanController } from "./modules/deliveryman/findAllDeliveries/FindAllDeliveriesDeliverymanController";

const routes = Router();

const createClientController = new CreateClientController();
const authenticateClientController = new AutheticateClientController();
const createDeliverymanController = new CreateDeliverymanController();
const authenticateDeliverymanController =
  new AuthenticateDeliverymanController();
const createDeliveryController = new CreateDeliveryController();
const findAllAvailableController = new FindAllAvailableController();
const updateDeliverymanController = new UpdateDeliverymanController();
const findAllDeliveriesCLient = new FindAllDeliveriesController();
const findAllDelveriesDeliveryman =
  new FindAllDeliveriesDeliverymanController();
const updateEndDateController = new UpdateEndDateController();

routes.post("/client/authenticate", authenticateClientController.handle);

routes.post(
  "/deliveryman/authenticate",
  authenticateDeliverymanController.handle
);

routes.post("/client/", createClientController.handle);

routes.post("/deliveryman/", createDeliverymanController.handle);

routes.post(
  "/delivery",
  ensureAuthenticateClients,
  createDeliveryController.handle
);

routes.get(
  "/delivery/available",
  ensureAuthenticateDeliveryman,
  findAllAvailableController.handle
);

routes.put(
  "/delivery/updateDeliveryman/:id",
  ensureAuthenticateDeliveryman,
  updateDeliverymanController.handle
);

routes.get(
  "/client/deliveries",
  ensureAuthenticateClients,
  findAllDeliveriesCLient.handle
);

routes.get(
  "/deliveryman/deliveries/",
  ensureAuthenticateDeliveryman,
  findAllDelveriesDeliveryman.handle
);

routes.put(
  "/delivery/updateEndDate/:id",
  ensureAuthenticateDeliveryman,
  updateEndDateController.handle
);

export { routes };
