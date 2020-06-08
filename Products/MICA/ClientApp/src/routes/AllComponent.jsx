//var blah = {}; // make a new dictionary (empty)
//var blah = { key: 'value', key2: 'value2' };
//console.log(blah['key2']);

import AsyncComponent from "components/Async/AsyncComponent.jsx";

//Module Components

/*Others Module*/
const Dashboard = AsyncComponent(() => { return import("modules/Users/views/Dashboard.jsx"); });
const Uwdashboard = AsyncComponent(() => { return import("modules/Users/views/UwDashBoard.jsx"); });
const UserDashboard = AsyncComponent(() => { return import("modules/Users/views/UserDashboard.jsx"); });
//import Dashboard from "modules/Users/views/Dashboard.jsx";
const TimelinePage = AsyncComponent(() => { return import("views/Pages/Timeline.jsx"); });
const RTLSupport = AsyncComponent(() => { return import("views/Pages/RTLSupport.jsx"); });
//const Testing = AsyncComponent(() => { return import("views/Test/Testing.jsx"); });
const UserProfile = AsyncComponent(() => { return import("views/Pages/UserProfile.jsx"); });
const PricingPage = AsyncComponent(() => { return import("views/Pages/PricingPage.jsx"); });
const LockScreenPage = AsyncComponent(() => { return import("views/Pages/LockScreenPage.jsx"); });
const Test = AsyncComponent(() => { return import("views/Test/Test.jsx"); });
const ModelTest = AsyncComponent(() => { return import("views/Test/ModelTest.jsx"); });
const RegisterPage = AsyncComponent(() => { return import("views/Pages/RegisterPage.jsx"); });

/*Login Module*/
const LoginPage = AsyncComponent(() => { return import("modules/Login/views/LoginPage.jsx"); });
const Feedback = AsyncComponent(() => { return import("modules/Login/views/Feedback.jsx"); });
//const Search = AsyncComponent(() => { return import("modules/Login/views/Search.jsx"); });
const PasswordPage = AsyncComponent(() => { return import("modules/Login/views/PasswordPage.jsx"); });
const RecoverPassword = AsyncComponent(() => { return import("modules/Login/views/_RecoverPassword.jsx"); });
//const ResetPassword = AsyncComponent(() => { return import("modules/Login/views/ResetPassword.jsx"); });

/*User Module*/
const AssignRole = AsyncComponent(() => { return import("modules/Users/views/UserManagement/_AssignRole.jsx"); });
const ChangePassword = AsyncComponent(() => { return import("modules/Users/views/UserManagement/_ChangePassword.jsx"); });
const ModifyUser = AsyncComponent(() => { return import("modules/Users/views/UserManagement/_ModifyUser.jsx"); });
const MyProfile = AsyncComponent(() => { return import("modules/Users/views/UserManagement/MyProfile.jsx"); });
const CreateRole = AsyncComponent(() => { return import("modules/Users/views/UserManagement/CreateRole.jsx"); });
const UserCreation = AsyncComponent(() => { return import("modules/Users/views/UserManagement/User.jsx"); });
const UserManagement = AsyncComponent(() => { return import("modules/Users/views/UserManagement.jsx"); });
const Privileges = AsyncComponent(() => { return import("modules/Users/views/UserManagement/_Privileges.jsx"); });
const RolePrivilage = AsyncComponent(() => { return import("modules/Users/views/UserManagement/_RolePrivileges.jsx"); });

/*Product Module*/
const ProductSearch = AsyncComponent(() => { return import("modules/Products/Micro/views/ProductSearch.jsx"); });
const ProductConfig = AsyncComponent(() => { return import("modules/Products/Micro/views/ProductConfig.jsx"); });
const ProductMapping = AsyncComponent(() => { return import("modules/Products/Micro/views/ProductMapping.jsx"); });
const MultiCover = AsyncComponent(() => { return import("modules/Products/Micro/MultiCover/ProductConfig.jsx"); });


/*RuleEngine Module*/
//const Rules = AsyncComponent(() => {return import("modules/RuleEngine/views/Rules.jsx");});
const RuleObject = AsyncComponent(() => { return import("modules/RuleEngine/views/RuleObject/RuleObject.jsx"); });
const Parameters = AsyncComponent(() => { return import("modules/RuleEngine/views/GeneralParameter/GeneralParameter"); });
const RuleConfig = AsyncComponent(() => { return import("modules/RuleEngine/views/RuleConfig/RuleConfig"); });
const RuleExecution = AsyncComponent(() => { return import("modules/RuleEngine/views/RuleExecution/RuleExecution"); });

/*Partner Module*/
const SearchAssignProduct = AsyncComponent(() => { return import("modules/Partners/Partner/views/SearchAssignProduct.jsx"); });
const SearchPartner = AsyncComponent(() => { return import("modules/Partners/Partner/views/SearchPartner.jsx"); });
const AssignProduct = AsyncComponent(() => { return import("modules/Partners/Partner/views/AssignProduct.jsx"); });
const PartnerDetails = AsyncComponent(() => { return import("modules/Partners/Partner/views/PartnerDetails.jsx"); });
const Partner = AsyncComponent(() => { return import("modules/Partners/Organization/views/CreatePartner.jsx"); });

/*Organization Module*/
const Organization = AsyncComponent(() => { return import("modules/Partners/Organization/views/Organization.jsx"); });
const SearchOrganization = AsyncComponent(() => { return import("modules/Partners/Organization/views/SearchOrganization.jsx"); });

/*Office Module*/
const Office = AsyncComponent(() => { return import("modules/Partners/Organization/views/Office.jsx"); });
const SearchOffice = AsyncComponent(() => { return import("modules/Partners/Organization/views/SearchOffice.jsx"); });

/*CD Account Module*/
const CreateCDaccount = AsyncComponent(() => { return import("modules/Partners/Accounts/Payment/views/CreateCDaccount.jsx"); });
const ReplenishCDaccount = AsyncComponent(() => { return import("modules/Partners/Accounts/Payment/views/ReplenishCDaccount.jsx"); });
const ViewCDAccount = AsyncComponent(() => { return import("modules/Partners/Accounts/Payment/views/ViewCDAccount.jsx"); });

/*Policy Module*/
const PolicyCancellation = AsyncComponent(() => { return import("modules/Policy/views/PolicyCancellation.jsx"); });
const RefundUpload = AsyncComponent(() => { return import("modules/Policy/views/RefundUpload.jsx"); });
const ApplicationCancel = AsyncComponent(() => { return import("modules/Policy/views/ProposalCancellation.jsx"); });


/*Billing Module*/
const CreateBilling = AsyncComponent(() => { return import("modules/Billing/BillingConfiguration/CreateBilling.jsx"); });
const SearchBilling = AsyncComponent(() => { return import("modules/Billing/BillingConfiguration/SearchBilling.jsx"); });
const CreateContract = AsyncComponent(() => { return import("modules/Billing/Contract/CreateContract.jsx"); });
const SearchContract = AsyncComponent(() => { return import("modules/Billing/Contract/SearchContract.jsx"); });
const CreateCustomer = AsyncComponent(() => { return import("modules/Billing/Customer/CreateCustomer.jsx"); });
const SearchCustomer = AsyncComponent(() => { return import("modules/Billing/Customer/SearchCustomer.jsx"); });
const Provision = AsyncComponent(() => { return import("modules/Billing/ProvisioningCustomer/CustomerConfig.jsx"); });
const GenerateInvoice = AsyncComponent(() => { return import("modules/Billing/Invoice/GenerateInvoice.jsx"); });
const InvoiceConfiguration = AsyncComponent(() => { return import("modules/Billing/Invoice/InvoiceConfiguration.jsx"); });
const SearchInvoice = AsyncComponent(() => { return import("modules/Billing/Invoice/SearchInvoice.jsx"); });
const RealisePayments = AsyncComponent(() => { return import("modules/Billing/Payments/RealisePayments.jsx"); });
const ReceivePayment = AsyncComponent(() => { return import("modules/Billing/Payments/ReceivePayment.jsx"); });
const SearchPayment = AsyncComponent(() => { return import("modules/Billing/Payments/SearchPayment.jsx"); });

/*WorkFlow Module*/
const DragNDrop = AsyncComponent(() => { return import("modules/Workflow/DragNDrop.jsx"); });
const LineofBusiness = AsyncComponent(() => { return import("modules/Workflow/LineofBusiness.jsx"); });

/*Claim Module*/
const ClaimEnquiry = AsyncComponent(() => { return import("modules/Claims/views/ClaimEnquiry/ClaimEnquiry.jsx"); });
const ClaimIntimate = AsyncComponent(() => { return import("modules/Claims/views/ClaimIntimate/ClaimIntimate.jsx"); });
const ClaimProcess = AsyncComponent(() => { return import("modules/Claims/views/ClaimProcess/ClaimProcess.jsx"); });
const ClaimReports = AsyncComponent(() => { return import("modules/Claims/views/ClaimReports/ClaimReports.jsx"); });
const ClaimInbox = AsyncComponent(() => { return import("modules/Claims/views/ClaimInbox/ClaimInbox.jsx"); });

//const FinanceProcess = AsyncComponent(() => { return import("modules/Claims/views/FinanceClaim/FinanceProcess.jsx"); });
const SearchClaim = AsyncComponent(() => { return import("modules/Claims/views/SearchClaim.jsx"); });
const UploadBankFile = AsyncComponent(() => { return import("modules/Claims/views/FinanceClaim/_FailureTransaction.jsx"); });
const ApprovedClaim = AsyncComponent(() => { return import("modules/Claims/views/FinanceClaim/_ApprovedClaim.jsx"); });
const SettledClaim = AsyncComponent(() => { return import("modules/Claims/views/FinanceClaim/_SettledClaim.jsx"); });
const PaymentFailure = AsyncComponent(() => { return import("modules/Claims/views/FinanceClaim/_PaymentFailure.jsx"); });

//const LineofBusiness = AsyncComponent(() => { return import("modules/Workflow/LineofBusiness.jsx"); });
//const ClaimReports = AsyncComponent(() => { return import("modules/Claims/views/ClaimReports/ClaimReports.jsx"); }); 
//const ClaimReports = AsyncComponent(() => { return import("modules/Claims/views/ClaimReports.jsx"); }); 

/*Account Module*/
const CreateAccount = AsyncComponent(() => { return import("modules/Accounts/views/CreateAccount.jsx"); });
const ModifyAccount = AsyncComponent(() => { return import("modules/Accounts/views/ModifyAccount.jsx"); });
const COAMapping = AsyncComponent(() => { return import("modules/Accounts/views/COAMapping.jsx"); });
const TransactionMapping = AsyncComponent(() => { return import("modules/Accounts/views/TransactionMapping.jsx"); });

/*Dynamic Page Module*/
const DynamicLayout = AsyncComponent(() => { return import("modules/DynamicPage/views/MasterLayout.jsx"); });
const DynamicForm = AsyncComponent(() => { return import("modules/Workflow/DynamicForm.jsx"); });
const Attributes = AsyncComponent(() => { return import("modules/Products/Dynamic/Attributes.jsx"); });
const Entities = AsyncComponent(() => { return import("modules/Products/Dynamic/Entities.jsx"); });
const SearchAttributes = AsyncComponent(() => { return import("modules/Products/Dynamic/SearchAttribute.jsx"); });
const SearchEntities = AsyncComponent(() => { return import("modules/Products/Dynamic/SearchEntity.jsx"); });
const DynamicProduct = AsyncComponent(() => { return import("modules/Products/Dynamic/ProductConfiguration/views/MasterLayout.jsx"); });
const SearchPSD = AsyncComponent(() => { return import("modules/DynamicPage/views/SearchPSD"); });

const Reports = AsyncComponent(() => { return import("modules/Accounts/views/Reports.jsx"); });
const ModifyCOAMapping = AsyncComponent(() => { return import("modules/Accounts/views/ModifyCOAMapping.jsx"); });

/*Rating Module*/
const RateParameters = AsyncComponent(() => { return import("modules/Rating/views/RateParameters.jsx"); });
const RateConfig = AsyncComponent(() => { return import("modules/Rating/views/RateObject.jsx"); });
const RateRules = AsyncComponent(() => { return import("modules/Rating/views/RateRules.jsx"); });
const RateExecution = AsyncComponent(() => { return import("modules/Rating/views/RateExecution.jsx"); });
const CalculationConfig = AsyncComponent(() => { return import("modules/Rating/views/CalculationConfig.jsx"); });
const CalculationResult = AsyncComponent(() => { return import("modules/Rating/views/CalculationResult.jsx"); });
const CalculationDisplay = AsyncComponent(() => { return import("modules/Rating/views/CalculationDisplay.jsx"); });
const EditCalculationConfig = AsyncComponent(() => { return import("modules/Rating/views/SearchCalculationConfig.jsx"); });
const EllustrationConfig = AsyncComponent(() => { return import("modules/Rating/views/EllustrationConfig.jsx"); });
const IllustrationResult = AsyncComponent(() => { return import("modules/Rating/views/IllustrationResult.jsx"); });


/* DMS module*/
const DmsDocument = AsyncComponent(() => { return import("modules/DMS/DmsDocument.jsx"); });

/* RDLC module*/
const RDLCReports = AsyncComponent(() => { return import("modules/RDLC/views/RDLCReports.jsx"); });

/*Reinsurance module*/
const ParticipantMaster = AsyncComponent(() => { return import("modules/Reinsurance/views/ParticipantMaster.jsx"); });
const SearchParticipantMaster = AsyncComponent(() => { return import("modules/Reinsurance/views/SearchParticipantMaster.jsx"); });
const DefineRetention = AsyncComponent(() => { return import("modules/Reinsurance/views/DefineRetention.jsx"); });
const SearchRetention = AsyncComponent(() => { return import("modules/Reinsurance/views/SearchRetention.jsx"); });
const ModifyRetention = AsyncComponent(() => { return import("modules/Reinsurance/views/ModifyRetention.jsx"); });
const CreateTreaty = AsyncComponent(() => { return import("modules/Reinsurance/views/CreateTreaty.jsx"); });
const SearchTreaty = AsyncComponent(() => { return import("modules/Reinsurance/views/SearchTreaty.jsx"); });
const ModifyTreaty = AsyncComponent(() => { return import("modules/Reinsurance/views/ModifyTreaty.jsx"); });
const DefineMapping = AsyncComponent(() => { return import("modules/Reinsurance/views/DefineMapping.jsx"); });
const SearchMapping = AsyncComponent(() => { return import("modules/Reinsurance/views/SearchMapping.jsx"); });
const ModifyMapping = AsyncComponent(() => { return import("modules/Reinsurance/views/ModifyMapping.jsx"); });

//Dynamic Reports
const ReportConfiguration = AsyncComponent(() => { return import("modules/DynamicReports/views/ReportConfiguration.jsx"); });
const ReportExecution = AsyncComponent(() => { return import("modules/DynamicReports/views/ReportExecution.jsx"); });
const ReportUpdate = AsyncComponent(() => { return import("modules/DynamicReports/views/ReportUpdate.jsx"); });

//Wrapper API
const WrapperAPIConfig = AsyncComponent(() => { return import("modules/WrapperAPI/views/WrapperAPIConfig.jsx"); });

//File Upload
const Upload = AsyncComponent(() => { return import("modules/FileUpload/views/Upload.jsx"); });


/*Allocation Module*/
const AllocationExecution = AsyncComponent(() => { return import("modules/Allocation/views/AllocationExecution.jsx"); });
const AllocationConfig = AsyncComponent(() => { return import("modules/Allocation/views/AllocationConfig.jsx"); });
const AllocationRules = AsyncComponent(() => { return import("modules/Allocation/views/AllocationRules.jsx"); });

export const ComponentsList = {
    Uwdashboard: Uwdashboard,
    PricingPage: PricingPage,
    LoginPage: LoginPage,
    RegisterPage: RegisterPage,
    RTLSupport: RTLSupport,
    LockScreenPage: LockScreenPage,
    PasswordPage: PasswordPage,
    Test: Test,
    CreateCDaccount: CreateCDaccount,
    ReplenishCDaccount: ReplenishCDaccount,
    ViewCDAccount: ViewCDAccount,
    ModelTest: ModelTest,
    Dashboard: Dashboard,
    UserProfile: UserProfile,
    TimelinePage: TimelinePage,
    ProductConfig: ProductConfig,
    PartnerDetails: PartnerDetails,
    SearchPartner: SearchPartner,
    Organization: Organization,
    SearchOffice: SearchOffice,
    SearchOrganization: SearchOrganization,
    Office: Office,
    AssignRole: AssignRole,
    Privileges: Privileges,
    RolePrivilage: RolePrivilage,
    UserCreation: UserCreation,
    UserManagement: UserManagement,
    Partner: Partner,
    AssignProduct: AssignProduct,
    RuleObject: RuleObject,
    Parameters: Parameters,
    RuleConfig: RuleConfig,
    RuleExecution: RuleExecution,
    RecoverPassword: RecoverPassword,
    ChangePassword: ChangePassword,
    ProductSearch: ProductSearch,
    ModifyUser: ModifyUser,
    ClaimIntimate: ClaimIntimate,
    SearchAssignProduct: SearchAssignProduct,
    SearchClaim: SearchClaim,
    MyProfile: MyProfile,
    PolicyCancellation: PolicyCancellation,
    ProductMapping: ProductMapping,
    CreateRole: CreateRole,
    CreateBilling: CreateBilling,
    SearchBilling: SearchBilling,
    CreateContract: CreateContract,
    SearchContract: SearchContract,
    CreateCustomer: CreateCustomer,
    SearchCustomer: SearchCustomer,
    Provision: Provision,
    GenerateInvoice: GenerateInvoice,
    InvoiceConfiguration: InvoiceConfiguration,
    SearchInvoice: SearchInvoice,
    RealisePayments: RealisePayments,
    ReceivePayment: ReceivePayment,
    SearchPayment: SearchPayment,
    DragNDrop: DragNDrop,
    LineofBusiness: LineofBusiness,
    ClaimEnquiry: ClaimEnquiry,
    ClaimReports: ClaimReports,
    ClaimProcess: ClaimProcess,
    //FinanceProcess: FinanceProcess,
    CreateAccount: CreateAccount,
    ModifyAccount: ModifyAccount,
    COAMapping: COAMapping,
    MultiCover: MultiCover,
    PaymentFailure: PaymentFailure,
    SettledClaim: SettledClaim,
    ApprovedClaim: ApprovedClaim,
    UploadBankFile: UploadBankFile,
    TransactionMapping: TransactionMapping,
    Reports: Reports,
    Feedback: Feedback,
    DynamicLayout: DynamicLayout,
    ModifyCOAMapping: ModifyCOAMapping,
    //Rating:Rating
    EditCalculationConfig: EditCalculationConfig,
    RateParameters: RateParameters,
    RateConfig: RateConfig,
    RateRules: RateRules,
    RateExecution: RateExecution,
    CalculationConfig: CalculationConfig,
    CalculationResult: CalculationResult,
    EllustrationConfig: EllustrationConfig,
    IllustrationResult: IllustrationResult,
    DmsDocument: DmsDocument,
    RDLCReports: RDLCReports,
    Attributes: Attributes,
    Entities: Entities,
    SearchAttributes: SearchAttributes,
    SearchEntities: SearchEntities,
    SearchPSD: SearchPSD,
    DynamicForm: DynamicForm,
    ParticipantMaster: ParticipantMaster,
    SearchParticipantMaster: SearchParticipantMaster,
    DefineRetention: DefineRetention,
    SearchRetention: SearchRetention,
    ModifyRetention: ModifyRetention,
    CreateTreaty: CreateTreaty,
    SearchTreaty: SearchTreaty,
    ModifyTreaty: ModifyTreaty,
    DefineMapping: DefineMapping,
    SearchMapping: SearchMapping,
    ModifyMapping: ModifyMapping,
    CalculationDisplay: CalculationDisplay,
    DynamicProd: DynamicProduct,
    UserDashboard: UserDashboard,
    ReportConfig: ReportConfiguration,
    ReportExecution: ReportExecution,
    ReportUpdate: ReportUpdate,
    ClaimInbox: ClaimInbox,
    //Allocation
    AllocationConfig: AllocationConfig,
    AllocationRules: AllocationRules,
    AllocationExecution: AllocationExecution,
    RefundUpload: RefundUpload,
    Upload: Upload,
    ApplicationCancel: ApplicationCancel,
    WrapperAPI: WrapperAPIConfig,
}

export default ComponentsList