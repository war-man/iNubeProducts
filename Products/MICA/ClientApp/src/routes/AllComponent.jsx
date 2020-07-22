//var blah = {}; // make a new dictionary (empty)
//var blah = { key: 'value', key2: 'value2' };
//console.log(blah['key2']);

import AsyncComponent from "components/Async/AsyncComponent.jsx";

//Module Components

/*Others Module*/
const Dashboard = AsyncComponent(() => { return import("modules/Users/views/Dashboard.jsx"); });
const AVODashboard = AsyncComponent(() => { return import("modules/Users/views/AVODashboard.jsx"); });
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
const OrgHierarchy = AsyncComponent(() => { return import("modules/Hierarchy/views/OrgHierarchy.jsx"); });
/*People Module*/
const People = AsyncComponent(() => { return import("modules/Hierarchy/views/People.jsx"); });
const SearchPeople = AsyncComponent(() => { return import("modules/Hierarchy/views/SearchPeople.jsx"); });
const PPLHierarchy = AsyncComponent(() => { return import("modules/Hierarchy/views/PPLHierarchy.jsx"); });
const Designation = AsyncComponent(() => { return import("modules/Hierarchy/views/Designation.jsx"); });

/*Office Module*/
const Office = AsyncComponent(() => { return import("modules/Partners/Organization/views/Office.jsx"); });
const SearchOffice = AsyncComponent(() => { return import("modules/Partners/Organization/views/SearchOffice.jsx"); });
const OffHierarchy = AsyncComponent(() => { return import("modules/Hierarchy/views/OffHierarchy.jsx"); });

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
const DynamicEntity = AsyncComponent(() => { return import("modules/Workflow/DynamicEntity.jsx"); });
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
const ViewRateTable = AsyncComponent(() => { return import("modules/Rating/views/ViewRateTable.jsx"); });

/*Dispatcher*/
const DispatcherTask = AsyncComponent(() => { return import("modules/Dispatcher/views/Dispatcher.jsx"); });
const DispatcherExecution = AsyncComponent(() => { return import("modules/Dispatcher/views/DispatcherExecution.jsx"); });


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
const Reallocation = AsyncComponent(() => { return import("modules/Reinsurance/views/Reallocation.jsx"); });

/* Coinsurance module*/
const Coin1 = AsyncComponent(() => { return import("modules/Coinsurance/views/Coin1.jsx"); });
const Coin2 = AsyncComponent(() => { return import("modules/Coinsurance/views/Coin2.jsx"); });
const Coin3 = AsyncComponent(() => { return import("modules/Coinsurance/views/Coin3.jsx"); });
//const Coin4 = AsyncComponent(() => { return import("modules/Coinsurance/views/Coin4.jsx"); });

//Dynamic Reports
const ReportConfiguration = AsyncComponent(() => { return import("modules/DynamicReports/views/ReportConfiguration.jsx"); });
const ReportExecution = AsyncComponent(() => { return import("modules/DynamicReports/views/ReportExecution.jsx"); });
const ReportUpdate = AsyncComponent(() => { return import("modules/DynamicReports/views/ReportUpdate.jsx"); });

//Dynamic Reports
const DashboardConfiguration = AsyncComponent(() => { return import("modules/DynamicDashboards/views/DashboardConfiguration.jsx"); });
const ViewDashboard = AsyncComponent(() => { return import("modules/DynamicDashboards/views/ViewDashboard.jsx"); });
const DashboardUpdate = AsyncComponent(() => { return import("modules/DynamicDashboards/views/DashboardUpdate.jsx"); });

//Wrapper API
const WrapperAPIConfig = AsyncComponent(() => { return import("modules/WrapperAPI/views/WrapperAPIConfig.jsx"); });

//SearchLog
const SearchLog = AsyncComponent(() => { return import("modules/SearchLog/views/SearchLog.jsx"); });

//File Upload
const Upload = AsyncComponent(() => { return import("modules/FileUpload/views/Upload.jsx"); });

/*Allocation Module*/
const AllocationExecution = AsyncComponent(() => { return import("modules/Allocation/views/AllocationExecution.jsx"); });
const AllocationConfig = AsyncComponent(() => { return import("modules/Allocation/views/AllocationConfig.jsx"); });
const AllocationRules = AsyncComponent(() => { return import("modules/Allocation/views/AllocationRules.jsx"); });

//avo modules
const Lead = AsyncComponent(() => { return import("modules/NewBusiness/Lead/Lead.jsx"); });
const Prospect = AsyncComponent(() => { return import("modules/NewBusiness/Prospect/Prospect.jsx"); });
const Quotation = AsyncComponent(() => { return import("modules/NewBusiness/Quotation/Quotation.jsx"); });
//const ProspectScreen = AsyncComponent(() => { return import("modules/NewBusiness/Prospect/ProspectScreen.jsx"); });
const Proposal = AsyncComponent(() => { return import("modules/NewBusiness/Proposal/Proposal.jsx"); });
const ProposalIncomplete = AsyncComponent(() => { return import("modules/NewBusiness/Proposal/ProposalIncomplete.jsx"); });
//const modifyProposal = AsyncComponent(() => { return import("modules/NewBusiness/Proposal/modifyProposal.jsx"); });
const Tasks = AsyncComponent(() => { return import("modules/Recruitment/Tasks/SearchTask.jsx"); });
const createSuspect = AsyncComponent(() => { return import("modules/Recruitment/createSuspect/createSuspect.jsx"); });
const createProspect = AsyncComponent(() => { return import("modules/Recruitment/createProspect/createProspect.jsx"); });

//hierarchy modules
const Movement = AsyncComponent(() => { return import("modules/Hierarchy/views/Movement.jsx"); });
const CreatePosition = AsyncComponent(() => { return import("modules/Hierarchy/views/CreatePosition.jsx"); });

//Inbox
const Inbox = AsyncComponent(() => { return import("modules/Hierarchy/views/Inbox.jsx"); });

//Renumeration
const CreateCommission = AsyncComponent(() => { return import("modules/Renumeration/views/CreateCommission.jsx"); });
const CreateAllowances = AsyncComponent(() => { return import("modules/Renumeration/views/CreateAllowances.jsx"); });
const CreateIncentive = AsyncComponent(() => { return import("modules/Renumeration/views/CreateIncentive.jsx"); });
const ViewAllowances = AsyncComponent(() => { return import("modules/Renumeration/views/ViewAllowances.jsx"); });
const ViewCommission = AsyncComponent(() => { return import("modules/Renumeration/views/ViewCommission.jsx"); });
const ViewIncentive = AsyncComponent(() => { return import("modules/Renumeration/views/ViewIncentive.jsx"); });
const Compensation = AsyncComponent(() => { return import("modules/Renumeration/views/Compensation.jsx"); });

//Contract
const GenerateContract = AsyncComponent(() => { return import("modules/Contracts/views/GenerateContract.jsx"); });
const ManageMaster = AsyncComponent(() => { return import("modules/Contracts/views/ManageMaster.jsx"); });
const RecruitmentUpload = AsyncComponent(() => { return import("modules/Contracts/views/RecruitmentUpload.jsx"); });
const AVOSearchContract = AsyncComponent(() => { return import("modules/Contracts/views/AVOSearchContract.jsx"); });

export const ComponentsList = {
    Uwdashboard: Uwdashboard,
    AVODashboard: AVODashboard,
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
    ViewRateTable: ViewRateTable,
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
    Reallocation: Reallocation,
    CalculationDisplay: CalculationDisplay,
    DynamicProd: DynamicProduct,
    DynamicEntity: DynamicEntity,
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
    EllustrationConfig: EllustrationConfig,
    Coin1: Coin1,
    Coin2: Coin2,
    Coin3: Coin3,
    //Coin4: Coin4,
    SearchLog: SearchLog,
    //AVO
    Lead: Lead,
    Prospect: Prospect,
    Quotation: Quotation,
    Proposal: Proposal,
    ProposalIncomplete: ProposalIncomplete,
    OrgHierarchy: OrgHierarchy,
    OffHierarchy: OffHierarchy,
    PPLHierarchy: PPLHierarchy,
    Designation: Designation,
    GenerateContract: GenerateContract,
    Tasks: Tasks,
    createSuspect: createSuspect,
    createProspect: createProspect,
    People: People,
    Movement: Movement,
    CreatePosition: CreatePosition,
    //Inbox
    Inbox: Inbox,
    //Renumeration
    CreateCommission: CreateCommission,
    CreateAllowances: CreateAllowances,
    CreateIncentive: CreateIncentive,
    ViewAllowances: ViewAllowances,
    ViewCommission: ViewCommission,
    ViewIncentive: ViewIncentive,
    Compensation: Compensation,
    //Contract
    ManageMaster: ManageMaster,
    RecruitmentUpload: RecruitmentUpload,
    AVOSearchContract: AVOSearchContract,

    //DynamicDashboards
    DashboardConfiguration: DashboardConfiguration,
    ViewDashboard: ViewDashboard,
    DashboardUpdate: DashboardUpdate,
    //Dispatcher
    DispatcherTask: DispatcherTask,
    DispatcherExecution: DispatcherExecution
}

export default ComponentsList;