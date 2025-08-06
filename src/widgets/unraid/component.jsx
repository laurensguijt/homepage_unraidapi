import Block from "components/services/widget/block";
import Container from "components/services/widget/container";
import { useTranslation } from "next-i18next";

import useWidgetAPI from "utils/proxy/use-widget-api";

export default function Component({ service }) {
  const { t } = useTranslation();
  const { widget } = service;

  const { data: stats, error } = useWidgetAPI(widget);

  if (error) {
    return <Container service={service} error={error} />;
  }

  if (!stats) {
    return (
      <Container service={service}>
        <Block label="unraid.cpu" />
        <Block label="unraid.memory" />
        <Block label="unraid.disk" />
      </Container>
    );
  }

  const cpuLoad = stats.cpu?.load_percent;
  const memoryUsage =
    stats.memory?.used_percent ??
    ((stats.memory?.used / stats.memory?.total) * 100);

  const arrayTotal = stats.array_total || { total: 0, used: 0 };
  const cacheTotal = stats.cache_total || { total: 0, used: 0 };
  const totalDisk = (arrayTotal.total || 0) + (cacheTotal.total || 0);
  const usedDisk = (arrayTotal.used || 0) + (cacheTotal.used || 0);
  const diskUsage = totalDisk ? (usedDisk / totalDisk) * 100 : 0;

  return (
    <Container service={service}>
      <Block label="unraid.cpu" value={t("common.percent", { value: cpuLoad })} />
      <Block label="unraid.memory" value={t("common.percent", { value: memoryUsage })} />
      <Block label="unraid.disk" value={t("common.percent", { value: diskUsage })} />
    </Container>
  );
}
