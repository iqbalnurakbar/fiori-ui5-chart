sap.ui.define(
  [
    "sap/ui/core/mvc/Controller",
    "sap/viz/ui5/format/ChartFormatter",
    "sap/viz/ui5/api/env/Format",
  ],
  function (Controller, ChartFormatter, Format) {
    "use strict";

    return Controller.extend("fiori.chart.controller.View1", {
      onInit: function () {
        Format.numericFormatter(ChartFormatter.getInstance());
        var FP = ChartFormatter.DefaultPattern;

        var vfLine = this.byId("vfLine");
        var vfColumn = this.byId("vfColumn");
        var vfDonut = this.byId("vfDonut");

        var popLine = this.byId("idPopOverLine");
        var popCol = this.byId("idPopOverColumn");
        var popDonut = this.byId("idPopOverDonut");

        if (vfLine) {
          vfLine.setVizProperties({
            valueAxis: { label: { formatString: FP.SHORTFLOAT_MFD2 } },
            plotArea: {
              dataLabel: { visible: false, formatString: FP.SHORTFLOAT_MFD2 },
            },
            timeAxis: {
              levels: ["month", "year"],
              levelConfig: {
                month: { label: { formatString: FP.MEDIUMMONTH } },
                year: { label: { formatString: FP.MEDIUMYEAR } },
              },
            },
          });
        }

        if (vfColumn) {
          vfColumn.setVizProperties({
            valueAxis: { label: { formatString: FP.STANDARDCURRENCY } },
            plotArea: {
              dataLabel: { visible: true, formatString: FP.STANDARDCURRENCY },
            },
          });
        }

        if (vfDonut) {
          vfDonut.setVizProperties({
            plotArea: {
              dataLabel: {
                visible: true,
                formatString: FP.STANDARDPERCENT_MFD2,
              },
              window: {
                start: "firstDataPoint",
                end: "lastDataPoint",
              },
            },

            legend: { visible: true },
          });
        }

        if (popLine && vfLine) {
          popLine.connect(vfLine.getVizUid());
          popLine.setFormatString({
            Date: FP.YEARMONTHDAY,
            Sales: FP.STANDARDCURRENCY,
            Profit: FP.STANDARDCURRENCY,
          });
        }
        if (popCol && vfColumn) {
          popCol.connect(vfColumn.getVizUid());
          popCol.setFormatString(FP.STANDARDCURRENCY);
        }
        if (popDonut && vfDonut) {
          popDonut.connect(vfDonut.getVizUid());
          popDonut.setFormatString(FP.STANDARDCURRENCY);
        }
      },

      toUTCDate: function (s) {
        if (!s) return null; // allow empty
        // expecting "yyyy-MM-dd"
        var [y, m, d] = s.split("-").map(Number);
        return new Date(Date.UTC(y, m - 1, d)); // real Date for time axis
      },
    });
  }
);
