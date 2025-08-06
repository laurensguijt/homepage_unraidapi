import Block from "components/services/widget/block";
import Container from "components/services/widget/container";
import { useTranslation } from "next-i18next";

import useWidgetAPI from "utils/proxy/use-widget-api";

export default function Component({ service }) {
  const { t } = useTranslation();
  const { widget } = service;

  const { data, error } = useWidgetAPI(widget);

  if (error) {
    return <Container service={service} error={error} />;
  }

  if (!data) {
    if (!widget.fields) {
      widget.fields = ["uptime", "net_rx", "net_tx", "parity"];
    }
    return (
      <Container service={service}>
        <Block label="unraid.uptime" />
        <Block label="unraid.net_rx" />
        <Block label="unraid.net_tx" />
        <Block label="unraid.parity" />
      </Container>
    );
  }

  const disks = data.disks || {};
  const network = data.network || {};

  if (!widget.fields) {
    widget.fields = [
      "uptime",
      "net_rx",
      "net_tx",
      "parity",
      ...Object.keys(disks),
    ];
  }

  return (
    <Container service={service}>
      <Block label="unraid.uptime" value={t("common.duration", { value: (data.uptime || 0) * 1000 })} />
      <Block label="unraid.net_rx" value={t("common.bibyterate", { value: network.rx || 0 })} />
      <Block label="unraid.net_tx" value={t("common.bibyterate", { value: network.tx || 0 })} />
      <Block label="unraid.parity" value={data.parity?.status || data.parity} />
      {Object.entries(disks).map(([name, disk]) => (
        <Block
          key={name}
          label={`unraid.${name}`}
          value={`${t("common.bytes", { value: disk.used || 0 })} / ${t("common.bytes", { value: disk.size || 0 })} (${t("common.number", { value: disk.temperature || 0 })}°C)`}
        />
      ))}
    </Container>
  );
}
