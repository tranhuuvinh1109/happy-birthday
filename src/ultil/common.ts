import { t } from "i18next";
import { TableBlogConfigType } from "../type/blog.type";

export const GetNameSick = (value: string) => {
  switch (value) {
    case "BA- cellulitis":
      return {
        Name: t("ResultPredict.Cellulitis.Name"),
        Description: t("ResultPredict.Cellulitis.Description"),
        Cause: t("ResultPredict.Cellulitis.Cause"),
        TreatmentOfDisease: t("ResultPredict.Cellulitis.TreatmentOfDisease"),
        Abstinence: t("ResultPredict.Cellulitis.Abstinence"),
        Recommendations: t("ResultPredict.Cellulitis.Recommendations"),
        HowToPreventDisease: t("ResultPredict.Cellulitis.HowToPreventDisease"),
      };
    case "BA-impetigo":
      return {
        Name: t("ResultPredict.Impetigo.Name"),
        Description: t("ResultPredict.Impetigo.Description"),
        Cause: t("ResultPredict.Impetigo.Cause"),
        TreatmentOfDisease: t("ResultPredict.Impetigo.TreatmentOfDisease"),
        Abstinence: t("ResultPredict.Impetigo.Abstinence"),
        Recommendations: t("ResultPredict.Impetigo.Recommendations"),
        HowToPreventDisease: t("ResultPredict.Impetigo.HowToPreventDisease"),
      };
    case "FU-athlete-foot":
      return {
        Name: t("ResultPredict.AthleteFoot.Name"),
        Description: t("ResultPredict.AthleteFoot.Description"),
        Cause: t("ResultPredict.AthleteFoot.Cause"),
        TreatmentOfDisease: t("ResultPredict.AthleteFoot.TreatmentOfDisease"),
        Abstinence: t("ResultPredict.AthleteFoot.Abstinence"),
        Recommendations: t("ResultPredict.AthleteFoot.Recommendations"),
        HowToPreventDisease: t("ResultPredict.AthleteFoot.HowToPreventDisease"),
      };
    case "FU-nail-fungus":
      return {
        Name: t("ResultPredict.NailFungus.Name"),
        Description: t("ResultPredict.NailFungus.Description"),
        Cause: t("ResultPredict.NailFungus.Cause"),
        TreatmentOfDisease: t("ResultPredict.NailFungus.TreatmentOfDisease"),
        Abstinence: t("ResultPredict.NailFungus.Abstinence"),
        Recommendations: t("ResultPredict.NailFungus.Recommendations"),
        HowToPreventDisease: t("ResultPredict.NailFungus.HowToPreventDisease"),
      };
    case "FU-ringworm":
      return {
        Name: t("ResultPredict.Ringworm.Name"),
        Description: t("ResultPredict.Ringworm.Description"),
        Cause: t("ResultPredict.Ringworm.Cause"),
        TreatmentOfDisease: t("ResultPredict.Ringworm.TreatmentOfDisease"),
        Abstinence: t("ResultPredict.Ringworm.Abstinence"),
        Recommendations: t("ResultPredict.Ringworm.Recommendations"),
        HowToPreventDisease: t("ResultPredict.Ringworm.HowToPreventDisease"),
      };
    case "VI-chickenpox":
      return {
        Name: t("ResultPredict.Chickenpox.Name"),
        Description: t("ResultPredict.Chickenpox.Description"),
        Cause: t("ResultPredict.Chickenpox.Cause"),
        TreatmentOfDisease: t("ResultPredict.Chickenpox.TreatmentOfDisease"),
        Abstinence: t("ResultPredict.Chickenpox.Abstinence"),
        Recommendations: t("ResultPredict.Chickenpox.Recommendations"),
        HowToPreventDisease: t("ResultPredict.Chickenpox.HowToPreventDisease"),
      };
    case "VI-shingles":
      return {
        Name: t("ResultPredict.Shingles.Name"),
        Description: t("ResultPredict.Shingles.Description"),
        Cause: t("ResultPredict.Shingles.Cause"),
        TreatmentOfDisease: t("ResultPredict.Shingles.TreatmentOfDisease"),
        Abstinence: t("ResultPredict.Shingles.Abstinence"),
        Recommendations: t("ResultPredict.Shingles.Recommendations"),
        HowToPreventDisease: t("ResultPredict.Shingles.HowToPreventDisease"),
      };
    default:
      return {
        Name: t("ResultPredict.CutaneousLarvaMigrans.Name"),
        Description: t("ResultPredict.CutaneousLarvaMigrans.Description"),
        Cause: t("ResultPredict.CutaneousLarvaMigrans.Cause"),
        TreatmentOfDisease: t("ResultPredict.CutaneousLarvaMigrans.TreatmentOfDisease"),
        Abstinence: t("ResultPredict.CutaneousLarvaMigrans.Abstinence"),
        Recommendations: t("ResultPredict.CutaneousLarvaMigrans.Recommendations"),
        HowToPreventDisease: t("ResultPredict.CutaneousLarvaMigrans.HowToPreventDisease"),
      };
  }
};

export const formatDate = (dateStr?: string) => {
  if (!dateStr) {
    return "";
  }
  const date = new Date(dateStr);
  const day = String(date.getUTCDate()).padStart(2, "0");
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const year = date.getUTCFullYear();

  return `${day}-${month}-${year}`;
};

export const TableBlogConfig: TableBlogConfigType[] = [
  {
    label: "Title",
    width: "w-2/12",
  },
  {
    label: "Creator",
    width: "w-2/12",
  },
  {
    label: "Category",
    width: "w-1/12",
  },
  {
    label: "CreatedAt",
    width: "w-2/12",
  },
  {
    label: "Image",
    width: "w-2/12",
  },
  {
    label: "Status",
    width: "w-2/12",
  },
  {
    label: "",
    width: "w-1/12",
  },
];
