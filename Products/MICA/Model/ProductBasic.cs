using System;

public class ProductBasic
{

    public string ProductName { get; set; }
    public int ProductCode { get; set; }
    public string ClassOfBusiness { get; set; }
    public string LineOfBusiness { get; set; }
    public int ProductStatus { get; set; }
    public string ActiveFrom { get; set; }
    public string ActiveTo { get; set; }
    public int InsurableItemId { get; set; }
    public double PremiumAmount { get; set; }
}

public class Cover
{

    public int CoverId { get; set; }
    public int CoverEventId { get; set; }
    public int CoverEventFactorId { get; set; }
    public string CoverDescription { get; set; }
    public int CoverEevntFactorUnitId { get; set; }
    public int CoverEevntFactorUnitTypeId { get; set; }
    public double CoverEventFactorValue { get; set; }
    public double CoverEventFactorUnit { get; set; }
}
public class Benefit
{

    public int BenefitId { get; set; }
    public int BenefitCriteriaId { get; set; }
    public int BenefitCriteriaValueId { get; set; }
    public string CoverDescription { get; set; }
    public int CoverEevntFactorUnitId { get; set; }
    public int CoverEevntFactorUnitTypeId { get; set; }
    public double BenefitAmount { get; set; }
    public double CoverEventFactorUnit { get; set; }
}
public class ProdConfigPage
{
    public string ProductName { get; set; }
    public int ProductCode { get; set; }
    public string ActiveFrom { get; set; }
    public string ActiveTo { get; set; }
}
public class ProdConfigViewModel
{
    public ProdConfigViewModel()
    {


    }
    public ProdConfigPage ProdConfig { get; set; }
}


