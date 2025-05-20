export interface Welcome {
  studies: Study[];
  nextPageToken: string;
}

export interface Study {
  protocolSection: ProtocolSection;
  derivedSection: DerivedSection;
  hasResults: boolean;
  documentSection?: DocumentSection;
  resultsSection?: ResultsSection;
}

export interface DerivedSection {
  miscInfoModule: MiscInfoModule;
  conditionBrowseModule?: TionBrowseModule;
  interventionBrowseModule?: TionBrowseModule;
}

export interface TionBrowseModule {
  meshes?: Ancestor[];
  browseLeaves: BrowseLeaf[];
  browseBranches: BrowseBranch[];
  ancestors?: Ancestor[];
}

export interface Ancestor {
  id: string;
  term: string;
}

export interface BrowseBranch {
  abbrev: string;
  name: string;
}

export interface BrowseLeaf {
  id: string;
  name: string;
  relevance: Relevance;
  asFound?: string;
}

export enum Relevance {
  High = 'HIGH',
  Low = 'LOW',
}

export interface MiscInfoModule {
  versionHolder: Date;
}

export interface DocumentSection {
  largeDocumentModule: LargeDocumentModule;
}

export interface LargeDocumentModule {
  largeDocs: LargeDoc[];
}

export interface LargeDoc {
  typeAbbrev: string;
  hasProtocol: boolean;
  hasSap: boolean;
  hasIcf: boolean;
  label: string;
  date: Date;
  uploadDate: string;
  filename: string;
  size: number;
}

export interface ProtocolSection {
  identificationModule: IdentificationModule;
  statusModule: StatusModule;
  sponsorCollaboratorsModule: SponsorCollaboratorsModule;
  oversightModule?: OversightModule;
  descriptionModule: DescriptionModule;
  conditionsModule: ConditionsModule;
  designModule: DesignModule;
  armsInterventionsModule: ArmsInterventionsModule;
  outcomesModule?: OutcomesModule;
  eligibilityModule: EligibilityModule;
  contactsLocationsModule: ContactsLocationsModule;
  referencesModule?: ReferencesModule;
  ipdSharingStatementModule?: IpdSharingStatementModule;
}

export interface ArmsInterventionsModule {
  armGroups?: ArmGroup[];
  interventions?: Intervention[];
}

export interface ArmGroup {
  label: string;
  type?: string;
  description?: string;
  interventionNames?: string[];
}

export interface Intervention {
  type: string;
  name: string;
  description?: string;
  armGroupLabels?: string[];
  otherNames?: string[];
}

export interface ConditionsModule {
  conditions: string[];
  keywords?: string[];
}

export interface ContactsLocationsModule {
  overallOfficials?: OverallOfficial[];
  locations?: Location[];
  centralContacts?: Contact[];
}

export interface Contact {
  name: string;
  role: CentralContactRole;
  phone?: string;
  email?: string;
}

export enum CentralContactRole {
  Contact = 'CONTACT',
  PrincipalInvestigator = 'PRINCIPAL_INVESTIGATOR',
}

export interface Location {
  facility: string;
  city: string;
  state?: string;
  zip?: string;
  country: Country;
  geoPoint: GeoPoint;
  status?: string;
  contacts?: Contact[];
}

export enum Country {
  China = 'China',
  Italy = 'Italy',
  KoreaRepublicOf = 'Korea, Republic of',
  UnitedStates = 'United States',
}

export interface GeoPoint {
  lat: number;
  lon: number;
}

export interface OverallOfficial {
  name: string;
  affiliation: string;
  role: OverallOfficialRole;
}

export enum OverallOfficialRole {
  PrincipalInvestigator = 'PRINCIPAL_INVESTIGATOR',
  StudyDirector = 'STUDY_DIRECTOR',
}

export interface DescriptionModule {
  briefSummary: string;
  detailedDescription?: string;
}

export interface DesignModule {
  studyType: StudyType;
  phases?: string[];
  designInfo: DesignInfo;
  enrollmentInfo: EnrollmentInfo;
  patientRegistry?: boolean;
  bioSpec?: BioSpec;
}

export interface BioSpec {
  retention: string;
  description: string;
}

export interface DesignInfo {
  allocation?: string;
  interventionModel?: string;
  interventionModelDescription?: string;
  primaryPurpose?: string;
  maskingInfo?: MaskingInfo;
  observationalModel?: string;
  timePerspective?: string;
}

export interface MaskingInfo {
  masking: string;
  whoMasked?: string[];
  maskingDescription?: string;
}

export interface EnrollmentInfo {
  count: number;
  type: EnrollmentInfoType;
}

export enum EnrollmentInfoType {
  Actual = 'ACTUAL',
  Estimated = 'ESTIMATED',
}

export enum StudyType {
  Interventional = 'INTERVENTIONAL',
  Observational = 'OBSERVATIONAL',
}

export interface EligibilityModule {
  eligibilityCriteria: string;
  healthyVolunteers?: boolean;
  sex: Sex;
  minimumAge: string;
  maximumAge?: string;
  stdAges: StdAge[];
  studyPopulation?: string;
  samplingMethod?: string;
}

export enum Sex {
  All = 'ALL',
  Male = 'MALE',
}

export enum StdAge {
  Adult = 'ADULT',
  Child = 'CHILD',
  OlderAdult = 'OLDER_ADULT',
}

export interface IdentificationModule {
  nctId: string;
  orgStudyIdInfo: OrgStudyIDInfo;
  organization: Organization;
  briefTitle: string;
  officialTitle: string;
  secondaryIdInfos?: SecondaryIDInfo[];
  acronym?: string;
}

export interface OrgStudyIDInfo {
  id: string;
}

export interface Organization {
  fullName: string;
  class: ClassEnum;
}

export enum ClassEnum {
  Nih = 'NIH',
  Other = 'OTHER',
  OtherGov = 'OTHER_GOV',
}

export interface SecondaryIDInfo {
  id: string;
  type?: ClassEnum;
  domain?: string;
  link?: string;
}

export interface IpdSharingStatementModule {
  ipdSharing: string;
  description?: string;
  infoTypes?: string[];
  timeFrame?: string;
  accessCriteria?: string;
}

export interface OutcomesModule {
  primaryOutcomes: AryOutcome[];
  secondaryOutcomes?: AryOutcome[];
}

export interface AryOutcome {
  measure: string;
  description?: string;
  timeFrame: string;
}

export interface OversightModule {
  oversightHasDmc?: boolean;
  isFdaRegulatedDrug?: boolean;
  isFdaRegulatedDevice?: boolean;
  isUsExport?: boolean;
}

export interface ReferencesModule {
  references?: Reference[];
  seeAlsoLinks?: SeeAlsoLink[];
}

export interface Reference {
  pmid?: string;
  type: ReferenceType;
  citation: string;
}

export enum ReferenceType {
  Background = 'BACKGROUND',
  Derived = 'DERIVED',
  Result = 'RESULT',
}

export interface SeeAlsoLink {
  label: string;
  url: string;
}

export interface SponsorCollaboratorsModule {
  responsibleParty?: ResponsibleParty;
  leadSponsor: LeadSponsor;
  collaborators?: LeadSponsor[];
}

export interface LeadSponsor {
  name: string;
  class: ClassEnum;
}

export interface ResponsibleParty {
  type: string;
  investigatorFullName?: string;
  investigatorTitle?: string;
  investigatorAffiliation?: string;
}

export interface StatusModule {
  statusVerifiedDate: string;
  overallStatus: string;
  expandedAccessInfo: ExpandedAccessInfo;
  startDateStruct: DateStruct;
  primaryCompletionDateStruct?: DateStruct;
  completionDateStruct: DateStruct;
  studyFirstSubmitDate: Date;
  studyFirstSubmitQcDate: Date;
  studyFirstPostDateStruct: DateStruct;
  lastUpdateSubmitDate: Date;
  lastUpdatePostDateStruct: DateStruct;
  whyStopped?: string;
  lastKnownStatus?: string;
  resultsFirstSubmitDate?: Date;
  resultsFirstSubmitQcDate?: Date;
  resultsFirstPostDateStruct?: DateStruct;
}

export interface DateStruct {
  date: string;
  type?: EnrollmentInfoType;
}

export interface ExpandedAccessInfo {
  hasExpandedAccess: boolean;
}

export interface ResultsSection {
  participantFlowModule: ParticipantFlowModule;
  baselineCharacteristicsModule: BaselineCharacteristicsModule;
  outcomeMeasuresModule: OutcomeMeasuresModule;
  adverseEventsModule: AdverseEventsModule;
  moreInfoModule: MoreInfoModule;
}

export interface AdverseEventsModule {
  frequencyThreshold: string;
  timeFrame: string;
  description: string;
  eventGroups: EventGroup[];
  seriousEvents: Event[];
  otherEvents: Event[];
}

export interface EventGroup {
  id: ID;
  title: Title;
  description: string;
  deathsNumAffected: number;
  deathsNumAtRisk: number;
  seriousNumAffected: number;
  seriousNumAtRisk: number;
  otherNumAffected: number;
  otherNumAtRisk: number;
}

export enum ID {
  Eg000 = 'EG000',
  Eg001 = 'EG001',
}

export enum Title {
  ArmIGenistein = 'Arm I - Genistein',
  ArmIIPlacebo = 'Arm II - Placebo',
  MediterraneanStyleDiet = 'Mediterranean Style Diet',
  SpecificCarbohydrateDiet = 'Specific Carbohydrate Diet',
  Total = 'Total',
}

export interface Event {
  term: string;
  organSystem: string;
  sourceVocabulary: SourceVocabulary;
  assessmentType: AssessmentType;
  stats: Stat[];
}

export enum AssessmentType {
  SystematicAssessment = 'SYSTEMATIC_ASSESSMENT',
}

export enum SourceVocabulary {
  Ctcae30 = 'CTCAE (3.0)',
  Ctcae40 = 'CTCAE (4.0)',
}

export interface Stat {
  groupId: ID;
  numAffected: number;
  numAtRisk: number;
  numEvents?: number;
}

export interface BaselineCharacteristicsModule {
  groups: Group[];
  denoms: Denom[];
  measures: Measure[];
}

export interface Denom {
  units: Unit;
  counts: Count[];
}

export interface Count {
  groupId: CountGroupID;
  value: string;
}

export enum CountGroupID {
  Bg000 = 'BG000',
  Bg001 = 'BG001',
  Bg002 = 'BG002',
  Og000 = 'OG000',
  Og001 = 'OG001',
}

export enum Unit {
  KgM2 = 'kg/m2',
  MgL = 'mg/L',
  Participants = 'Participants',
  UgG = 'ug/g',
  UnitsOnAScale = 'units on a scale',
  Years = 'years',
}

export interface Group {
  id: string;
  title: Title;
  description: string;
}

export interface Measure {
  title: string;
  paramType: ParamType;
  unitOfMeasure: Unit;
  classes: MeasureClass[];
  dispersionType?: DispersionType;
  description?: string;
}

export interface MeasureClass {
  categories: PurpleCategory[];
  title?: string;
}

export interface PurpleCategory {
  title?: string;
  measurements: Measurement[];
}

export interface Measurement {
  groupId: CountGroupID;
  value: string;
  lowerLimit?: string;
  upperLimit?: string;
}

export enum DispersionType {
  InterQuartileRange = 'INTER_QUARTILE_RANGE',
}

export enum ParamType {
  CountOfParticipants = 'COUNT_OF_PARTICIPANTS',
  Median = 'MEDIAN',
}

export interface MoreInfoModule {
  limitationsAndCaveats?: LimitationsAndCaveats;
  certainAgreement: CertainAgreement;
  pointOfContact: PointOfContact;
}

export interface CertainAgreement {
  piSponsorEmployee: boolean;
  restrictiveAgreement?: boolean;
}

export interface LimitationsAndCaveats {
  description: string;
}

export interface PointOfContact {
  title: string;
  organization: string;
  email: string;
  phone: string;
}

export interface OutcomeMeasuresModule {
  outcomeMeasures: OutcomeMeasure[];
}

export interface OutcomeMeasure {
  type: string;
  title: string;
  description: string;
  populationDescription?: string;
  reportingStatus: string;
  timeFrame: string;
  groups: Group[];
  denoms: Denom[];
  paramType?: ParamType;
  unitOfMeasure?: Unit;
  classes?: OutcomeMeasureClass[];
}

export interface OutcomeMeasureClass {
  categories: FluffyCategory[];
}

export interface FluffyCategory {
  measurements: Count[];
}

export interface ParticipantFlowModule {
  preAssignmentDetails: string;
  recruitmentDetails: string;
  groups: Group[];
  periods: Period[];
}

export interface Period {
  title: string;
  milestones: Milestone[];
  dropWithdraws: DropWithdraw[];
}

export interface DropWithdraw {
  type: string;
  reasons: Reason[];
}

export interface Reason {
  groupId: ReasonGroupID;
  numSubjects: string;
}

export enum ReasonGroupID {
  Fg000 = 'FG000',
  Fg001 = 'FG001',
}

export interface Milestone {
  type: string;
  achievements: Achievement[];
}

export interface Achievement {
  groupId: ReasonGroupID;
  numSubjects: string;
  comment?: string;
}
