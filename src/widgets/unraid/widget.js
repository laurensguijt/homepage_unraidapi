import genericProxyHandler from "utils/proxy/handlers/generic";

const widget = {
  api: "{url}/unraid/api?apikey={key}",
  proxyHandler: genericProxyHandler,
};

export default widget;
