using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text;


namespace iNube.Services.Claims.Models.ClaimManagement
{
    public class BillingDetailsModel
    {
        public BillingDetailsModel()
        {

            EstimationPartBillingList = new List<EstimationPartBilling>();
            EstimationPaintBillingList = new List<EstimationPaintBillingList>();
            EstimationPaintLabourList = new List<EstimationPaintLabour>();
            EstimationConsumableBillingList = new List<EstimationConsumableBilling>();
            EstimationSalvageBillingList = new List<EstimationSalvageBilling>();

            AssessmentPartBillingList = new List<AssessmentPartBilling>();
            AssessmentPaintBillingList = new List<AssessmentPaintBilling>();
            AssessmentPaintLabourBillingList = new List<AssessmentPaintLabourBilling>();
            AssessmentConsumableBillingList = new List<AssessmentConsumableBilling>();
            AssessmentSalvageBillingList = new List<AssessmentSalvageBilling>();
            AssessmentTowingBillingList = new List<AssessmentTowingBilling>();


            BillingDetailsPartsList = new List<BillingDetailsParts>();
            BillingDetailsPaintList = new List<BillingDetailsPaint>();
            BillingDetailsConsumableList = new List<BillingDetailsConsumable>();
            BillingDetailsTowingList = new List<BillingDetailsTowing>();
            BillingDetailsLabourList = new List<BillingDetailsLabour>();

            liabiirysummary = new LiabilitySummary();


            LiabilityPartBillingList = new List<LiabilityPartBilling>();
            LiabilityPaintBillingList = new List<LiabilityPaintBilling>();
            LiabilityConsumableBillingList = new List<LiabilityConsumableBilling>();
            LiabilitySalvageBillingList = new List<LiabilitySalvageBilling>();
            LiabilityTowingBillingList = new List<LiabilityTowingBilling>();

            ImageAnalysisModelList = new List<ImageAnalysisModel>();
        }
        public string IncidentDateTime { get; set; }
        public List<EstimationPartBilling> EstimationPartBillingList { get; set; }
        public List<EstimationPaintBillingList> EstimationPaintBillingList { get; set; }
        public List<EstimationPaintLabour> EstimationPaintLabourList { get; set; }
        public List<EstimationConsumableBilling> EstimationConsumableBillingList { get; set; }
        public List<EstimationSalvageBilling> EstimationSalvageBillingList { get; set; }
        public List<ImageAnalysisModel> ImageAnalysisModelList { get; set; }
        public LiabilitySummary liabiirysummary { get; set; }
        public List<AssessmentPartBilling> AssessmentPartBillingList { get; set; }
        public List<AssessmentPaintBilling> AssessmentPaintBillingList { get; set; }
        public List<AssessmentPaintLabourBilling> AssessmentPaintLabourBillingList { get; set; }
        public List<AssessmentConsumableBilling> AssessmentConsumableBillingList { get; set; }
        public List<AssessmentSalvageBilling> AssessmentSalvageBillingList { get; set; }
        public List<AssessmentTowingBilling> AssessmentTowingBillingList { get; set; }

        public List<BillingDetailsParts> BillingDetailsPartsList { get; set; }
        public List<BillingDetailsPaint> BillingDetailsPaintList { get; set; }
        public List<BillingDetailsConsumable> BillingDetailsConsumableList { get; set; }
        public List<BillingDetailsTowing> BillingDetailsTowingList { get; set; }
        public List<BillingDetailsLabour> BillingDetailsLabourList { get; set; }


        public List<LiabilityPartBilling> LiabilityPartBillingList { get; set; }
        public List<LiabilityPaintBilling> LiabilityPaintBillingList { get; set; }
        public List<LiabilityConsumableBilling> LiabilityConsumableBillingList { get; set; }
        public List<LiabilitySalvageBilling> LiabilitySalvageBillingList { get; set; }
        public List<LiabilityTowingBilling> LiabilityTowingBillingList { get; set; }

        public decimal? TransactionID { get; set; }
        public string workshopvalue { get; set; }
        public string Rolename { get; set; }
        public Nullable<int> CaptureBills { get; set; }
        public string DocumentName { get; set; }
        //commented by Mohan
        //public List<SelectListItem> Partsname { get; set; }
        public string SingleBillNo { get; set; }
        public string SingleBillDate { get; set; }
        public Nullable<int> SinglePaymentToID { get; set; }
        public string SinglePaintBillNo { get; set; }
        public string SinglePaintBillDate { get; set; }
        public Nullable<int> SinglePaintPaymentToID { get; set; }
        public string SingleConsumableBillNo { get; set; }
        public string SingleConsumableBillDate { get; set; }
        public Nullable<int> SingleConsumablePaymentToID { get; set; }
        public string SingleTowingBillNo { get; set; }
        public string SingleTowingBillDate { get; set; }
        public Nullable<int> SingleTowingPaymentToID { get; set; }
        public Nullable<int> SettlementTypeid { get; set; }
        public Nullable<int> DecisionTypeid { get; set; }
        public Nullable<int> SettlementTypeidSurveyor { get; set; }

        //public Nullable<System.DateTime> IncidentDateTime { get; set; }

        public Nullable<decimal> RateDiscount { get; set; }
        public Nullable<decimal> FlatDiscount { get; set; }
        public Nullable<decimal> AmountAfterDiscount { get; set; }
        public bool IsNILDepreciation { get; set; }
    }

    public class ImageAnalysisModel
    {
        public int VehicleViewSegmentId { get; set; }
        public int? VehicleViewPartId { get; set; }
        public int VehicleViewID { get; set; }
        public int ViewSegmentNO { get; set; }
        public int TypeOfCarsID { get; set; }
        public string PartName { get; set; }
        public bool IsChecked { get; set; }

    }

    public class EstimationPartBilling
    {
        public int SNo { get; set; }
        public string partname { get; set; }
        public string partcode { get; set; }
        public Nullable<int> HSN { get; set; }
        public Nullable<int> SAC { get; set; }
        public string DocumentName { get; set; }
        public Nullable<int> Partid { get; set; }
        public Nullable<int> Partcodeid { get; set; }
        public Nullable<int> HsnCode { get; set; }
        public Nullable<int> PartSideID { get; set; }
        public Nullable<int> Typeid { get; set; }
        public Nullable<int> MaterialID { get; set; }
        public Nullable<int> NatureOfDamageID { get; set; }
        public Nullable<int> ActionID { get; set; }
        public decimal TransactionID { get; set; }
        public Nullable<int> NoofUnits { get; set; }

        public Nullable<decimal> CostPerUnit { get; set; }
        public Nullable<decimal> TotalEstimatedAmountParts { get; set; }
        public Nullable<decimal> TotalEstimatedLumpsumAmountParts { get; set; }

        public Nullable<decimal> TaxRateSGST { get; set; }
        public Nullable<decimal> TaxRateUGST { get; set; }
        public Nullable<decimal> TaxRateIGST { get; set; }
        public Nullable<decimal> TaxAmountSGST { get; set; }
        public Nullable<decimal> TaxAmountUGST { get; set; }
        public Nullable<decimal> TaxAmountIGST { get; set; }
        public Nullable<decimal> TotalTaxAmount { get; set; }
        public Nullable<decimal> TotalAmountwithTax { get; set; }
        public Nullable<decimal> LabourRR { get; set; }
        public string Remarks { get; set; }
        public string PartSide { get; set; }
        public string NatureOfDamage { get; set; }
        public bool IsItemwiseorIsLumpsum { get; set; }
        public Nullable<int> ExpenseType { get; set; }
        public Nullable<int> SerialNo { get; set; }
    }

    public class EstimationPaintBillingList
    {
        public int SNo { get; set; }
        public Nullable<int> Partid { get; set; }
        public Nullable<int> PartSideID { get; set; }
        public Nullable<int> Typeid { get; set; }
        public Nullable<int> HSN { get; set; }
        public Nullable<int> SAC { get; set; }
        public Nullable<int> MaterialID { get; set; }
        public Nullable<int> NoofPanes { get; set; }
        public Nullable<decimal> EstimatedPaintingAmount { get; set; }
        public Nullable<decimal> TaxRateSGST { get; set; }
        public Nullable<decimal> TaxRateUGST { get; set; }
        public Nullable<decimal> TaxRateIGST { get; set; }
        public Nullable<decimal> TaxAmountSGST { get; set; }
        public Nullable<decimal> TaxAmountUGST { get; set; }
        public Nullable<decimal> TaxAmountIGST { get; set; }
        public Nullable<decimal> TotalTaxAmount { get; set; }
        public Nullable<decimal> TotalAmountwithTax { get; set; }
        public Nullable<decimal> PaintMaterialCost { get; set; }
        public Nullable<decimal> LabourPaint { get; set; }
        public Nullable<decimal> PaintMaterialinltrs { get; set; }
        public Nullable<decimal> PaintPriceinltrs { get; set; }
        public Nullable<decimal> TotalEstimatedAmountPaint { get; set; }
        public Nullable<decimal> EstimatedPaintingLumpsumAmount { get; set; }

        public Nullable<decimal> PercentageOfPaintMaterial { get; set; }
        public Nullable<decimal> PercentageOfPaintLabour { get; set; }
        public Nullable<bool> IsPaintChargesInclussiveOfLabourCharges { get; set; }
        public string Remarks { get; set; }
        public string DocumentName { get; set; }
        public string PartSide { get; set; }
        public string PartName { get; set; }
        public string Partcode { get; set; }
        public bool IsItemwiseorIsLumpsum { get; set; }
    }
    public class EstimationPaintLabour
    {
        public int SNo { get; set; }
        public Nullable<int> Partid { get; set; }
        public Nullable<int> PartSideID { get; set; }
        public Nullable<int> MaterialID { get; set; }
        public Nullable<int> NoofPanes { get; set; }
        public Nullable<decimal> EstimatedPaintingAmount { get; set; }
        public Nullable<int> PaintMaterialCost { get; set; }
        public Nullable<int> LabourPaint { get; set; }
        public Nullable<decimal> PaintMaterialinltrs { get; set; }
        public Nullable<decimal> PaintPriceinltrs { get; set; }
        public Nullable<decimal> TotalEstimatedAmountPaint { get; set; }
        public Nullable<decimal> PercentageOfPaintMaterial { get; set; }
        public Nullable<decimal> PercentageOfPaintLabour { get; set; }
        public bool IsPaintChargesInclussiveOfLabourCharges { get; set; }
        public string Remarks { get; set; }
        public string DocumentName { get; set; }
    }
    public class EstimationConsumableBilling
    {
        public int SNo { get; set; }
        public Nullable<int> HSN { get; set; }
        public Nullable<int> SAC { get; set; }
        public Nullable<int> Consumableid { get; set; }
        public Nullable<int> NoOfUnits { get; set; }
        public Nullable<decimal> CostPerUnit { get; set; }
        public Nullable<decimal> TotalEstimatedAmount { get; set; }
        public Nullable<decimal> TotalEstimatedLumpsumAmount { get; set; }

        public Nullable<int> Typeid { get; set; }
        public string Remarks { get; set; }
        public string DocumentName { get; set; }
        public string PartName { get; set; }
        public string Partcode { get; set; }
        public string PartType { get; set; }
        public Nullable<decimal> TaxRateSGST { get; set; }
        public Nullable<decimal> TaxRateUGST { get; set; }
        public Nullable<decimal> TaxRateIGST { get; set; }
        public Nullable<decimal> TaxAmountSGST { get; set; }
        public Nullable<decimal> TaxAmountUGST { get; set; }
        public Nullable<decimal> TaxAmountIGST { get; set; }
        public Nullable<decimal> TotalTaxAmount { get; set; }
        public Nullable<decimal> TotalAmountwithTax { get; set; }
        public bool IsItemwiseorIsLumpsum { get; set; }
    }


    public class EstimationSalvageBilling
    {
        public int SNo { get; set; }
        public Nullable<int> Partid { get; set; }
        public Nullable<int> PartSideID { get; set; }
        public Nullable<int> MaterialID { get; set; }
        public Nullable<int> NatureOfDamageID { get; set; }
        public Nullable<int> NoofUnits { get; set; }
        public Nullable<decimal> CostPerUnit { get; set; }
        public Nullable<decimal> TotalEstimatedAmount { get; set; }
        public Nullable<bool> IsItemwiseorIsLumpsum { get; set; }
        public Nullable<decimal> Lumpsum { get; set; }
        public string Remarks { get; set; }
        public string DocumentName { get; set; }
        public string PartName { get; set; }
        public string PartCode { get; set; }
        public string NatureOfDamage { get; set; }
        public Nullable<int> HSN { get; set; }
        public Nullable<int> SAC { get; set; }
        public Nullable<decimal> TaxRateSGST { get; set; }
        public Nullable<decimal> TaxRateUGST { get; set; }
        public Nullable<decimal> TaxRateIGST { get; set; }
        public Nullable<decimal> TaxAmountSGST { get; set; }
        public Nullable<decimal> TaxAmountUGST { get; set; }
        public Nullable<decimal> TaxAmountIGST { get; set; }
        public Nullable<decimal> TotalTaxAmount { get; set; }
        public Nullable<decimal> TotalAmountwithTax { get; set; }
    }

    public class AssessmentPartBilling
    {
        public int SNo { get; set; }
        public string partname { get; set; }
        public string PartCode { get; set; }
        public Nullable<int> Partid { get; set; }
        public Nullable<int> PartSideID { get; set; }
        public Nullable<int> MaterialID { get; set; }
        public Nullable<int> HSN { get; set; }
        public Nullable<int> SAC { get; set; }
        public Nullable<int> NatureOfDamageID { get; set; }
        public Nullable<int> ActionID { get; set; }
        public Nullable<decimal> TransactionID { get; set; }
        public Nullable<int> NoofUnits { get; set; }
        public Nullable<decimal> CostPerUnit { get; set; }
        public Nullable<decimal> TotalAssessmentAmountParts { get; set; }
        public Nullable<decimal> DepreciationPercentage { get; set; }
        public Nullable<decimal> DepreciationValue { get; set; }
        public Nullable<decimal> LabourRR { get; set; }
        public Nullable<decimal> Cost { get; set; }
        public Nullable<int> Typeid { get; set; }
        public string Remarks { get; set; }
        public string DocumentName { get; set; }
        public string NatureOfDamage { get; set; }
        public string ExpenseType { get; set; }
        public Nullable<decimal> TaxRateSGST { get; set; }
        public Nullable<decimal> TaxRateUGST { get; set; }
        public Nullable<decimal> TaxRateIGST { get; set; }
        public Nullable<decimal> TaxAmountSGST { get; set; }
        public Nullable<decimal> TaxAmountUGST { get; set; }
        public Nullable<decimal> TaxAmountIGST { get; set; }
        public Nullable<decimal> TotalTaxAmount { get; set; }
        public Nullable<decimal> TotalAmountwithTax { get; set; }

    }


    public class AssessmentPaintBilling
    {
        public int SNo { get; set; }
        public Nullable<int> Partid { get; set; }
        public Nullable<int> PartSideID { get; set; }
        public Nullable<int> MaterialID { get; set; }
        public string PartCode { get; set; }
        public Nullable<int> HSN { get; set; }
        public Nullable<int> SAC { get; set; }
        public Nullable<int> NoofPanes { get; set; }
        public Nullable<decimal> Cost { get; set; }
        public Nullable<decimal> DepreciationPercentage { get; set; }
        public Nullable<decimal> DepreciationValue { get; set; }
        public Nullable<decimal> PaintMaterialCost { get; set; }
        public Nullable<decimal> LabourPaint { get; set; }
        public Nullable<decimal> PaintMaterialinltrs { get; set; }
        public Nullable<decimal> PaintPriceinltrs { get; set; }
        public Nullable<decimal> TotalEstimatedAmountPaint { get; set; }
        public Nullable<decimal> PercentageOfPaintMaterial { get; set; }
        public Nullable<decimal> PercentageOfPaintLabour { get; set; }
        public Nullable<bool> IsPaintChargesInclussiveOfLabourCharges { get; set; }
        public string Remarks { get; set; }
        public Nullable<int> Typeid { get; set; }
        public string DocumentName { get; set; }
        public string PartName { get; set; }
        public string ExpenseType { get; set; }
        public Nullable<decimal> TaxRateSGST { get; set; }
        public Nullable<decimal> TaxRateUGST { get; set; }
        public Nullable<decimal> TaxRateIGST { get; set; }
        public Nullable<decimal> TaxAmountSGST { get; set; }
        public Nullable<decimal> TaxAmountUGST { get; set; }
        public Nullable<decimal> TaxAmountIGST { get; set; }
        public Nullable<decimal> TotalTaxAmount { get; set; }
        public Nullable<decimal> TotalAmountwithTax { get; set; }
    }

    public class AssessmentPaintLabourBilling
    {
        public int SNo { get; set; }
        public Nullable<int> Partid { get; set; }
        public Nullable<int> PartSideID { get; set; }
        public Nullable<int> MaterialID { get; set; }
        public Nullable<int> NoofPanes { get; set; }
        public Nullable<decimal> EstimatedPaintingAmount { get; set; }
        public Nullable<int> PaintMaterialCost { get; set; }
        public Nullable<int> LabourPaint { get; set; }
        public Nullable<decimal> PaintMaterialinltrs { get; set; }
        public Nullable<decimal> PaintPriceinltrs { get; set; }
        public Nullable<decimal> DepreciationPercentage { get; set; }
        public Nullable<decimal> DepreciationValue { get; set; }
        public Nullable<decimal> TotalEstimatedAmountPaint { get; set; }
        public Nullable<decimal> Cost { get; set; }
        public Nullable<decimal> PercentageOfPaintMaterial { get; set; }
        public Nullable<decimal> PercentageOfPaintLabour { get; set; }
        public bool IsPaintChargesInclussiveOfLabourCharges { get; set; }
        public string Remarks { get; set; }
        public string DocumentName { get; set; }
        public Nullable<decimal> TaxRateSGST { get; set; }
        public Nullable<decimal> TaxRateUGST { get; set; }
        public Nullable<decimal> TaxRateIGST { get; set; }
        public Nullable<decimal> TaxAmountSGST { get; set; }
        public Nullable<decimal> TaxAmountUGST { get; set; }
        public Nullable<decimal> TaxAmountIGST { get; set; }
        public Nullable<decimal> TotalTaxAmount { get; set; }
        public Nullable<decimal> TotalAmountwithTax { get; set; }

    }

    public class AssessmentConsumableBilling
    {
        public int SNo { get; set; }
        public Nullable<int> Consumableid { get; set; }
        public Nullable<int> NoOfUnits { get; set; }
        public Nullable<decimal> CostPerUnit { get; set; }
        public Nullable<decimal> TotalEstimatedAmount { get; set; }
        public string Remarks { get; set; }
        public Nullable<int> Typeid { get; set; }
        public string DocumentName { get; set; }
        public string PartName { get; set; }
        public string ExpenseType { get; set; }
        public string PartCode { get; set; }
        public Nullable<int> HSN { get; set; }
        public Nullable<int> SAC { get; set; }
        public Nullable<decimal> TaxRateSGST { get; set; }
        public Nullable<decimal> TaxRateUGST { get; set; }
        public Nullable<decimal> TaxRateIGST { get; set; }
        public Nullable<decimal> TaxAmountSGST { get; set; }
        public Nullable<decimal> TaxAmountUGST { get; set; }
        public Nullable<decimal> TaxAmountIGST { get; set; }
        public Nullable<decimal> TotalTaxAmount { get; set; }
        public Nullable<decimal> TotalAmountwithTax { get; set; }
    }

    public class AssessmentSalvageBilling
    {
        public int SNo { get; set; }
        public Nullable<int> Partid { get; set; }
        public Nullable<int> PartSideID { get; set; }
        public Nullable<int> MaterialID { get; set; }
        public Nullable<int> NatureOfDamageID { get; set; }
        public Nullable<int> NoofUnits { get; set; }
        public Nullable<decimal> CostPerUnit { get; set; }
        public Nullable<decimal> TotalEstimatedAmount { get; set; }
        public Nullable<bool> IsItemwiseorIsLumpsum { get; set; }
        public Nullable<decimal> Lumpsum { get; set; }
        public string Remarks { get; set; }
        public string DocumentName { get; set; }
        public string PartName { get; set; }
        public string NatureOfDamage { get; set; }
        public string PartCode { get; set; }
        public Nullable<int> HSN { get; set; }
        public Nullable<int> SAC { get; set; }
        public Nullable<decimal> TaxRateSGST { get; set; }
        public Nullable<decimal> TaxRateUGST { get; set; }
        public Nullable<decimal> TaxRateIGST { get; set; }
        public Nullable<decimal> TaxAmountSGST { get; set; }
        public Nullable<decimal> TaxAmountUGST { get; set; }
        public Nullable<decimal> TaxAmountIGST { get; set; }
        public Nullable<decimal> TotalTaxAmount { get; set; }
        public Nullable<decimal> TotalAmountwithTax { get; set; }
    }

    public class AssessmentTowingBilling
    {
        public int SNo { get; set; }
        public Nullable<int> TowedByID { get; set; }
        public Nullable<int> TowServiceTypeID { get; set; }
        public Nullable<int> BillTypeID { get; set; }
        public Nullable<decimal> ChargesPerKM { get; set; }
        public Nullable<decimal> TotalDistanceInKM { get; set; }
        public Nullable<decimal> TotalAssessmentAmount { get; set; }
        public string Remark { get; set; }
        public string DocumentName { get; set; }
        public string TowedBy { get; set; }
        public string TowServiceType { get; set; }
        public string BillType { get; set; }
        public Nullable<decimal> TaxRateSGST { get; set; }
        public Nullable<decimal> TaxRateUGST { get; set; }
        public Nullable<decimal> TaxRateIGST { get; set; }
        public Nullable<decimal> TaxAmountSGST { get; set; }
        public Nullable<decimal> TaxAmountUGST { get; set; }
        public Nullable<decimal> TaxAmountIGST { get; set; }
        public Nullable<decimal> TotalTaxAmount { get; set; }
        public Nullable<decimal> TotalAmountwithTax { get; set; }
        public string PartCode { get; set; }
        public Nullable<int> HSN { get; set; }
        public Nullable<int> SAC { get; set; }
    }

    public class BillingDetailsParts
    {
        public int SNo { get; set; }
        public Nullable<int> Partid { get; set; }
        public Nullable<int> PartSideID { get; set; }
        public Nullable<int> MaterialID { get; set; }
        public Nullable<int> NatureOfDamageID { get; set; }
        public Nullable<int> PurchasedFromID { get; set; }
        public decimal? TransactionID { get; set; }
        public Nullable<int> NoofUnits { get; set; }
        public Nullable<decimal> CostPerUnit { get; set; }
        public Nullable<decimal> TotalBill { get; set; }
        public Nullable<decimal> PercentageOfTax { get; set; }
        public Nullable<decimal> TaxAmount { get; set; }
        public Nullable<decimal> TotalBillWithTax { get; set; }
        public string BillNo { get; set; }
        public string BillDate { get; set; }
        public Nullable<int> PaymentToID { get; set; }
        public string Remarks { get; set; }
        public Nullable<int> Typeid { get; set; }
        public Nullable<decimal> DepreciationPercentage { get; set; }
        public Nullable<decimal> DepreciationValue { get; set; }
        public Nullable<decimal> AmountafterDepreciationValue { get; set; }
        public string PartCode { get; set; }
        public Nullable<int> HSN { get; set; }
        public Nullable<int> SAC { get; set; }
        public string DocumentName { get; set; }
        public string PartName { get; set; }
        public string ExpenseType { get; set; }
        public string DamageType { get; set; }
        public string PaymentTo { get; set; }
        public Nullable<decimal> TaxRateSGST { get; set; }
        public Nullable<decimal> TaxRateUGST { get; set; }
        public Nullable<decimal> TaxRateIGST { get; set; }
        public Nullable<decimal> TaxAmountSGST { get; set; }
        public Nullable<decimal> TaxAmountUGST { get; set; }
        public Nullable<decimal> TaxAmountIGST { get; set; }
    }
    public class BillingDetailsConsumable
    {
        public int SNo { get; set; }
        public Nullable<int> Consumableid { get; set; }
        public decimal TransactionID { get; set; }
        public Nullable<int> NoofUnits { get; set; }
        public Nullable<decimal> CostPerUnit { get; set; }
        public Nullable<decimal> TotalBill { get; set; }
        public Nullable<decimal> PercentageOfTax { get; set; }
        public Nullable<decimal> TaxAmount { get; set; }
        public Nullable<decimal> TotalBillWithTax { get; set; }
        public string BillNo { get; set; }
        public string BillDate { get; set; }
        public Nullable<int> PaymentToID { get; set; }
        public string Remarks { get; set; }
        public Nullable<int> Typeid { get; set; }
        public string DocumentName { get; set; }
        public string ConsumableName { get; set; }
        public string PaymentTo { get; set; }
        public string ExpenseType { get; set; }
        public Nullable<decimal> TaxRateSGST { get; set; }
        public Nullable<decimal> TaxRateUGST { get; set; }
        public Nullable<decimal> TaxRateIGST { get; set; }
        public Nullable<decimal> TaxAmountSGST { get; set; }
        public Nullable<decimal> TaxAmountUGST { get; set; }
        public Nullable<decimal> TaxAmountIGST { get; set; }
        public string PartCode { get; set; }
        public Nullable<int> HSN { get; set; }
        public Nullable<int> SAC { get; set; }
    }

    public class BillingDetailsTowing
    {
        public int SNo { get; set; }
        public Nullable<int> TowedByID { get; set; }
        public Nullable<int> TowServiceTypeID { get; set; }
        public Nullable<int> BillTypeID { get; set; }
        public Nullable<decimal> ChargesPerKM { get; set; }
        public Nullable<decimal> TotalDistanceInKM { get; set; }
        public Nullable<decimal> TotalBill { get; set; }
        public Nullable<decimal> PercentageOfTax { get; set; }
        public Nullable<decimal> TaxAmount { get; set; }
        public Nullable<decimal> TotalBillWithTax { get; set; }
        public string BillNo { get; set; }
        public string BillDate { get; set; }
        public Nullable<int> PaymentToID { get; set; }
        public string Remarks { get; set; }
        public string DocumentName { get; set; }
        public string TowedBy { get; set; }
        public string TowServiceType { get; set; }
        public string BillType { get; set; }
        public string PaymentTo { get; set; }
        public Nullable<decimal> TaxRateSGST { get; set; }
        public Nullable<decimal> TaxRateUGST { get; set; }
        public Nullable<decimal> TaxRateIGST { get; set; }
        public Nullable<decimal> TaxAmountSGST { get; set; }
        public Nullable<decimal> TaxAmountUGST { get; set; }
        public Nullable<decimal> TaxAmountIGST { get; set; }
        public string PartCode { get; set; }
        public Nullable<int> HSN { get; set; }
        public Nullable<int> SAC { get; set; }
    }

    public class BillingDetailsPaint
    {
        public int SNo { get; set; }
        public Nullable<int> Partid { get; set; }
        public Nullable<int> PartSideID { get; set; }
        public Nullable<int> MaterialID { get; set; }
        public decimal TransactionID { get; set; }
        public Nullable<int> NoOfPanes { get; set; }
        public Nullable<decimal> PaintMaterialinltrs { get; set; }
        public Nullable<decimal> PaintPriceinltrs { get; set; }
        public Nullable<decimal> TotalBill { get; set; }
        public Nullable<decimal> PercentageOfTax { get; set; }
        public Nullable<decimal> TaxAmount { get; set; }
        public Nullable<decimal> TotalBillWithTax { get; set; }
        public string BillNo { get; set; }
        public string BillDate { get; set; }
        public Nullable<int> PaymentToID { get; set; }
        public string Remarks { get; set; }
        public int ClaimBillingPaintDetailID { get; set; }
        public Nullable<int> Typeid { get; set; }
        public Nullable<decimal> DepreciationPercentage { get; set; }
        public Nullable<decimal> DepreciationValue { get; set; }
        public Nullable<decimal> AmountafterDepreciationValue { get; set; }
        public string DocumentName { get; set; }
        public string ExpenseType { get; set; }
        public string PartName { get; set; }
        public string PaymentTo { get; set; }
        public string DamageType { get; set; }
        public Nullable<decimal> TaxRateSGST { get; set; }
        public Nullable<decimal> TaxRateUGST { get; set; }
        public Nullable<decimal> TaxRateIGST { get; set; }
        public Nullable<decimal> TaxAmountSGST { get; set; }
        public Nullable<decimal> TaxAmountUGST { get; set; }
        public Nullable<decimal> TaxAmountIGST { get; set; }
        public string PartCode { get; set; }
        public Nullable<int> HSN { get; set; }
        public Nullable<int> SAC { get; set; }
    }

    public class BillingDetailsLabour
    {
        public int SNo { get; set; }
        public Nullable<int> Partid { get; set; }
        public Nullable<int> PartSideID { get; set; }
        public Nullable<int> MaterialID { get; set; }
        public Nullable<int> NatureOfDamageID { get; set; }
        public Nullable<int> LabourTypeID { get; set; }
        public Nullable<int> NoofUnits { get; set; }
        public Nullable<decimal> CostPerUnit { get; set; }
        public Nullable<decimal> SubTotal { get; set; }
        public Nullable<decimal> PercentageOfTax { get; set; }
        public Nullable<decimal> TaxAmount { get; set; }
        public Nullable<decimal> TotalBillWithTax { get; set; }
        public string BillNo { get; set; }
        public Nullable<System.DateTime> BillDate { get; set; }
        public Nullable<int> PaymentToID { get; set; }
        public string Remarks { get; set; }
        public string DocumentName { get; set; }
    }

    public class LiabilityPartBilling
    {
        public int SNo { get; set; }
        public Nullable<int> Partid { get; set; }
        public string PartName { get; set; }
        public string PartTypeName { get; set; }
        public Nullable<int> PartSideID { get; set; }
        public Nullable<int> MaterialID { get; set; }
        public Nullable<int> NatureOfDamageID { get; set; }
        public Nullable<int> NoofUnits { get; set; }
        public Nullable<decimal> DepreciationPercentage { get; set; }
        public Nullable<decimal> DepreciationAmount { get; set; }
        public Nullable<decimal> DepreciationValue { get; set; }
        public Nullable<decimal> LiabilityDepreciationValue { get; set; }
        public Nullable<decimal> BilledTaxpercentage { get; set; }
        public Nullable<decimal> BilledTaxAmount { get; set; }
        public Nullable<decimal> BilledAmountWithTax { get; set; }
        public Nullable<decimal> LiabilityDepreciationPercentage { get; set; }
        public Nullable<decimal> LiabilityDepreciationAmount { get; set; }
        public Nullable<decimal> LiabilityTaxpercentage { get; set; }
        public Nullable<decimal> LiabilityAmountWithTax { get; set; }
        public Nullable<decimal> LiabilityTaxAmount { get; set; }
        public Nullable<int> LiabilityPaymentToID { get; set; }
        public Nullable<decimal> Estimated { get; set; }
        public Nullable<decimal> Assessed { get; set; }
        public Nullable<decimal> Bills { get; set; }
        public Nullable<decimal> Liability { get; set; }
        public string Remarks { get; set; }
        public Nullable<int> EstimatedNoofUnits { get; set; }
        public Nullable<int> AssessedNoofUnits { get; set; }
        public Nullable<int> BillsNoofUnits { get; set; }
        public Nullable<int> Typeid { get; set; }
        public Nullable<int> PaymentToID { get; set; }
        public string PaymentTo { get; set; }
        public Nullable<decimal> RateDiscount { get; set; }
        public Nullable<decimal> FlatDiscount { get; set; }
        public Nullable<decimal> AmountAfterDiscount { get; set; }
        public Nullable<decimal> TaxRateSGST { get; set; }
        public Nullable<decimal> TaxRateUGST { get; set; }
        public Nullable<decimal> TaxRateIGST { get; set; }
        public Nullable<decimal> TaxAmountSGST { get; set; }
        public Nullable<decimal> TaxAmountUGST { get; set; }
        public Nullable<decimal> TaxAmountIGST { get; set; }
        public string PartCode { get; set; }
        public Nullable<int> HSN { get; set; }
        public Nullable<int> SAC { get; set; }
    }

    public class LiabilityPaintBilling
    {
        public int SNo { get; set; }
        public Nullable<int> Partid { get; set; }
        public string PartName { get; set; }
        public string PartTypeName { get; set; }
        public Nullable<int> PartSideID { get; set; }
        public Nullable<int> MaterialID { get; set; }
        public Nullable<int> NoofUnits { get; set; }
        public Nullable<decimal> DepreciationPercentage { get; set; }
        public Nullable<decimal> DepreciationAmount { get; set; }
        public Nullable<decimal> LiabilityDepreciationValue { get; set; }
        public Nullable<decimal> Estimated { get; set; }
        public Nullable<decimal> Assessed { get; set; }
        public Nullable<decimal> Bills { get; set; }
        public Nullable<decimal> Liability { get; set; }
        public string Remarks { get; set; }
        public Nullable<int> EstimatedNoofUnits { get; set; }
        public Nullable<int> AssessedNoofUnits { get; set; }
        public Nullable<int> BillsNoofUnits { get; set; }
        public Nullable<int> Typeid { get; set; }
        public Nullable<int> PaymentToID { get; set; }
        public string PaymentTo { get; set; }
        public Nullable<decimal> LiabilityTaxAmount { get; set; }
        public Nullable<decimal> BilledTaxAmount { get; set; }
        public Nullable<decimal> BilledTaxpercentage { get; set; }
        public Nullable<decimal> BilledAmountWithTax { get; set; }
        public Nullable<decimal> LiabilityDepreciationPercentage { get; set; }
        public Nullable<decimal> LiabilityDepreciationAmount { get; set; }
        public Nullable<decimal> LiabilityTaxpercentage { get; set; }
        public Nullable<decimal> LiabilityAmountWithTax { get; set; }
        public Nullable<int> LiabilityPaymentToID { get; set; }
        public Nullable<decimal> TaxRateSGST { get; set; }
        public Nullable<decimal> TaxRateUGST { get; set; }
        public Nullable<decimal> TaxRateIGST { get; set; }
        public Nullable<decimal> TaxAmountSGST { get; set; }
        public Nullable<decimal> TaxAmountUGST { get; set; }
        public Nullable<decimal> TaxAmountIGST { get; set; }
        public string PartCode { get; set; }
        public Nullable<int> HSN { get; set; }
        public Nullable<int> SAC { get; set; }
        public Nullable<decimal> RateDiscount { get; set; }
        public Nullable<decimal> FlatDiscount { get; set; }
        public Nullable<decimal> AmountAfterDiscount { get; set; }
    }

    public class LiabilityConsumableBilling
    {
        public int SNo { get; set; }
        public Nullable<int> Consumableid { get; set; }
        public Nullable<int> NoofUnits { get; set; }
        public string PartName { get; set; }
        public string PartTypeName { get; set; }
        public Nullable<decimal> CostPerUnit { get; set; }
        public Nullable<decimal> Estimated { get; set; }
        public Nullable<decimal> Assessed { get; set; }
        public Nullable<decimal> Bills { get; set; }
        public Nullable<decimal> Liability { get; set; }
        public string Remarks { get; set; }
        public Nullable<int> EstimatedNoofUnits { get; set; }
        public Nullable<int> AssessedNoofUnits { get; set; }
        public Nullable<int> BillsNoofUnits { get; set; }
        public Nullable<int> Typeid { get; set; }
        public Nullable<int> PaymentToID { get; set; }
        public string PaymentTo { get; set; }
        public Nullable<decimal> BilledTaxpercentage { get; set; }
        public Nullable<decimal> BilledAmountWithTax { get; set; }
        public Nullable<decimal> LiabilityTaxpercentage { get; set; }
        public Nullable<decimal> LiabilityAmountWithTax { get; set; }
        public Nullable<int> LiabilityPaymentToID { get; set; }
        public Nullable<decimal> LiabilityTaxAmount { get; set; }
        public Nullable<decimal> BilledTaxAmount { get; set; }
        public Nullable<decimal> TaxRateSGST { get; set; }
        public Nullable<decimal> TaxRateUGST { get; set; }
        public Nullable<decimal> TaxRateIGST { get; set; }
        public Nullable<decimal> TaxAmountSGST { get; set; }
        public Nullable<decimal> TaxAmountUGST { get; set; }
        public Nullable<decimal> TaxAmountIGST { get; set; }
        public string PartCode { get; set; }
        public Nullable<int> HSN { get; set; }
        public Nullable<int> SAC { get; set; }
        public Nullable<decimal> RateDiscount { get; set; }
        public Nullable<decimal> FlatDiscount { get; set; }
        public Nullable<decimal> AmountAfterDiscount { get; set; }
    }


    public class LiabilitySalvageBilling
    {
        public int SNo { get; set; }
        public Nullable<int> Partid { get; set; }
        public string PartName { get; set; }
        public string PartTypeName { get; set; }
        public Nullable<int> PartSideID { get; set; }
        public Nullable<int> MaterialID { get; set; }
        public Nullable<int> NatureOfDamageID { get; set; }
        public Nullable<int> NoofUnits { get; set; }
        public Nullable<decimal> Estimated { get; set; }
        public Nullable<decimal> Assessed { get; set; }
        public Nullable<decimal> Bills { get; set; }
        public Nullable<decimal> Liability { get; set; }
        public string Remarks { get; set; }
        public Nullable<int> EstimatedNoofUnits { get; set; }
        public Nullable<int> AssessedNoofUnits { get; set; }
        public Nullable<int> BillsNoofUnits { get; set; }
        public Nullable<int> PaymentToID { get; set; }

        public Nullable<int> NoofunitReceived { get; set; }
        public Nullable<decimal> NoofunitReceivedamount { get; set; }
        public Nullable<int> Noofunitswaived { get; set; }
        public Nullable<decimal> Noofunitswaivedamount { get; set; }
        public Nullable<int> NoofunitsNotReceived { get; set; }
        public Nullable<decimal> NoofunitsNotReceivedamount { get; set; }
        public Nullable<int> RetainedBy { get; set; }

        public Nullable<decimal> ItemsrecivedforValue { get; set; }
        public Nullable<decimal> ItemswaivedforValue { get; set; }
        public Nullable<decimal> ItemsnotreceivedforValue { get; set; }
        public Nullable<int> RetainedBylumpsum { get; set; }
        public string Remarkslumpsum { get; set; }

        public Nullable<bool> IsItemwiseorIsLumpsumforestimation { get; set; }
        public Nullable<bool> IsItemwiseorIsLumpsumforassessment { get; set; }

        public Nullable<decimal> Estimatedforlumpsum { get; set; }
        public Nullable<decimal> Assessedforlumpsum { get; set; }

        public Nullable<decimal> TaxRateSGST { get; set; }
        public Nullable<decimal> TaxRateUGST { get; set; }
        public Nullable<decimal> TaxRateIGST { get; set; }
        public Nullable<decimal> TaxAmountSGST { get; set; }
        public Nullable<decimal> TaxAmountUGST { get; set; }
        public Nullable<decimal> TaxAmountIGST { get; set; }

        public string PartCode { get; set; }
        public Nullable<int> HSN { get; set; }
        public Nullable<int> SAC { get; set; }

        public Nullable<decimal> RateDiscount { get; set; }
        public Nullable<decimal> FlatDiscount { get; set; }
        public Nullable<decimal> AmountAfterDiscount { get; set; }


    }
    public class LiabilityTowingBilling
    {
        public int SNo { get; set; }
        public Nullable<int> TowedByID { get; set; }
        public Nullable<int> TowServiceTypeID { get; set; }
        public Nullable<int> BillTypeID { get; set; }
        public Nullable<decimal> ChargesPerKM { get; set; }
        public Nullable<decimal> TotalDistanceInKM { get; set; }
        public Nullable<decimal> Estimated { get; set; }
        public Nullable<decimal> Assessed { get; set; }
        public Nullable<decimal> Bills { get; set; }
        public Nullable<decimal> Liability { get; set; }
        public string Remarks { get; set; }
        public Nullable<int> EstimatedNoofUnits { get; set; }
        public Nullable<int> AssessedNoofUnits { get; set; }
        public Nullable<int> BillsNoofUnits { get; set; }
        public Nullable<int> PaymentToID { get; set; }
        public string TowedBy { get; set; }
        public string TowServiceType { get; set; }
        public string PaymentTo { get; set; }
        public Nullable<decimal> BilledTaxpercentage { get; set; }
        public Nullable<decimal> BilledAmountWithTax { get; set; }
        public Nullable<decimal> LiabilityTaxpercentage { get; set; }
        public Nullable<decimal> LiabilityAmountWithTax { get; set; }
        public Nullable<int> LiabilityPaymentToID { get; set; }
        public Nullable<decimal> LiabilityTaxAmount { get; set; }
        public Nullable<decimal> BilledTaxAmount { get; set; }
        public Nullable<decimal> TaxRateSGST { get; set; }
        public Nullable<decimal> TaxRateUGST { get; set; }
        public Nullable<decimal> TaxRateIGST { get; set; }
        public Nullable<decimal> TaxAmountSGST { get; set; }
        public Nullable<decimal> TaxAmountUGST { get; set; }
        public Nullable<decimal> TaxAmountIGST { get; set; }
        public string PartCode { get; set; }
        public Nullable<int> HSN { get; set; }
        public Nullable<int> SAC { get; set; }

        public Nullable<decimal> RateDiscount { get; set; }
        public Nullable<decimal> FlatDiscount { get; set; }
        public Nullable<decimal> AmountAfterDiscount { get; set; }
    }

    public class BillingSummary
    {
        public decimal? MaterialSum { get; set; }
        public decimal? LabourSum { get; set; }
        public decimal? TowngSum { get; set; }
        public decimal? PaytoWSSum { get; set; }
        public decimal? PayToCustomerSum { get; set; }
        public decimal? TransactionID { get; set; }
        public decimal? TotalSum { get; set; }
    }

    public class LiabilitySummary
    {
        public Nullable<decimal> IDV { get; set; }
        public Nullable<decimal> TotalLiabilityAmount { get; set; }
        public Nullable<decimal> PolicyExcessAmount { get; set; }
        public Nullable<decimal> VoluntaryExcessAmount { get; set; }
        public Nullable<decimal> ImposedExcessAmount { get; set; }
        public Nullable<decimal> InsurerLiability { get; set; }
        public Nullable<decimal> TotalPaytoWorkshopEstimated { get; set; }
        public Nullable<decimal> TotalPaytoWorkshopAssessed { get; set; }
        public Nullable<decimal> TotalPaytoWorkshopBilling { get; set; }
        public Nullable<decimal> TotalPaytoWorkshopLiability { get; set; }
        public Nullable<decimal> TotalPaytoCustomerEstimated { get; set; }
        public Nullable<decimal> TotalPaytoCustomerAssessed { get; set; }
        public Nullable<decimal> TotalPaytoCustomerBilling { get; set; }
        public Nullable<decimal> TotalPaytoCustomerLiability { get; set; }
        //  public decimal? LabourSum { get; set; }
        //  public decimal? TowngSum { get; set; }
        public Nullable<decimal> MaterialSumEstimated { get; set; }
        public Nullable<decimal> MaterialSumAssessed { get; set; }
        public Nullable<decimal> MaterialSumBilling { get; set; }
        public Nullable<decimal> MaterialSumLiability { get; set; }
        public Nullable<decimal> LabourSumEstimated { get; set; }
        public Nullable<decimal> LabourSumAssessed { get; set; }
        public Nullable<decimal> LabourSumBilling { get; set; }
        public Nullable<decimal> LabourSumLiability { get; set; }
        public Nullable<decimal> TowngSumAssessed { get; set; }
        public Nullable<decimal> TowngSumBilling { get; set; }
        public Nullable<decimal> TowngSumLiability { get; set; }
        public Nullable<decimal> TotaltaxBilled { get; set; }
        public Nullable<decimal> TotaltaxLiability { get; set; }
        public Nullable<decimal> DepricationAssessed { get; set; }
        public Nullable<decimal> DepricationLiability { get; set; }
        public Nullable<decimal> NoofunitsNotReceivedAmount { get; set; }
        public Nullable<decimal> NoofunitReceivedamount { get; set; }
        public Nullable<decimal> Noofunitswaivedamount { get; set; }
        public Nullable<decimal> CustomerShare { get; set; }
        public Nullable<decimal> TransactionID { get; set; }
        public Nullable<decimal> GrossAmount { get; set; }
        public Nullable<decimal> NetDeduction { get; set; }
        public Nullable<decimal> NetAmount { get; set; }
        public Nullable<decimal> TaxRateSGST { get; set; }
        public Nullable<decimal> TaxRateUGST { get; set; }
        public Nullable<decimal> TaxRateIGST { get; set; }

        public Nullable<decimal> TaxAmountSGSTEstimation { get; set; }
        public Nullable<decimal> TaxAmountUGSTEstimation { get; set; }
        public Nullable<decimal> TaxAmountIGSTEstimation { get; set; }

        public Nullable<decimal> TaxAmountSGSTAssessment { get; set; }
        public Nullable<decimal> TaxAmountUGSTAssessment { get; set; }
        public Nullable<decimal> TaxAmountIGSTAssessment { get; set; }

        public Nullable<decimal> TaxAmountSGSTBilling { get; set; }
        public Nullable<decimal> TaxAmountUGSTBilling { get; set; }
        public Nullable<decimal> TaxAmountIGSTBilling { get; set; }

        public Nullable<decimal> TaxAmountSGSTLiability { get; set; }
        public Nullable<decimal> TaxAmountUGSTLiability { get; set; }
        public Nullable<decimal> TaxAmountIGSTLiability { get; set; }

        public Nullable<decimal> TaxAmountEstimation { get; set; }
        public Nullable<decimal> TaxAmountAssessment { get; set; }
        public Nullable<decimal> TaxAmountBilling { get; set; }
        public Nullable<decimal> TaxAmountLiability { get; set; }

        public Nullable<decimal> RateDiscount { get; set; }
        public Nullable<decimal> FlatDiscount { get; set; }
        public decimal AmountAfterDiscount { get; set; }

        public Nullable<int> SettlementTypeid { get; set; }

        public decimal SalvageDisposalValue { get; set; }

        public decimal ClaimAmountPayableForsalvage { get; set; }


    }


    public class EstimationSummary
    {
        public decimal? MaterialSum { get; set; }
        public decimal? LabourSum { get; set; }
        public decimal? SalvageSum { get; set; }
        public decimal? TotalSum { get; set; }
        public decimal? TransactionId { get; set; }
        public decimal? LumpsumSum { get; set; }
        public decimal? IDV { get; set; }
    }

    public class AssessmentSummary
    {
        public decimal? MaterialSum { get; set; }
        public decimal? LabourSum { get; set; }
        public decimal? SalvageSum { get; set; }
        public decimal? TowingSum { get; set; }
        public decimal? TotalSum { get; set; }
        public decimal? TransactionId { get; set; }
        public Nullable<int> SettlementTypeid { get; set; }
        public decimal? IDV { get; set; }
        public int? DecisionTypeid { get; set; }
    }

    public class Result
    {
        public int? Count { get; set; }
    }
}
