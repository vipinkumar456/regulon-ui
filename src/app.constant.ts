export const PATH = {
  SIGNIN: 'api/v1/user/signIn',
  LOGIN_PATH: "oauth/token",
  LOGOUT: "logout",
  USER_BY_TOKEN: "userbytoken",
  USER_ALL: "api/v1/user",
  USER_ROLES_ALL: "api/authority",
  LOGIN_USER: "api/user/validateUser",
  VALIDATE_USER:'api/v1/user/validateUser',
  TRANCHE1_ALL: "api/tranche1/work",
  TRANCHE1_MAKER:"api/tranche1/work/maker?quarter=:qt&rejectedFlag=:rf&tranchetype=:tt&year=:year",
  TRANCHE1_MAKER_STATUS:"api/tranche1/work/makerRecordsByStatus?page=:page&size=:size&quarter=:qt&status=:status&tranchetype=:tt&year=:year",
  TRANCHE1_CHECKER_STATUS:"api/tranche1/work/checkerRecordsByStatus?page=:page&size=:size&quarter=:qt&status=:status&tranchetype=:tt&year=:year",
  TRANCHE1_CHECKER:"api/tranche1/work/checker?quarter=:qt&tranchetype=:tt&year=:year",
  TRANCHE2_MAKER:"api/tranche2/work/maker?quarter=:qt&rejectedFlag=:rf&tranchetype=:tt&year=:year",
  TRANCHE2_CHECKER:"api/tranche2/work/checker?quarter=:qt&tranchetype=:tt&year=:year",
  TRANCHE3_MAKER:"api/tranche3/work/maker?quarter=:qt&rejectedFlag=:rf&tranchetype=:tt&year=:year",
  TRANCHE3_CHECKER:"api/tranche2/work/checker?quarter=:qt&tranchetype=:tt&year=:year",
  TRANCHE1_CHECKER_ALL:
    "api/tranche1/work/checker?page=:page&size=:size&quarter=:qt&tranchetype=:tt&year=:year",
  TRANCHE1_CHECKER_SEARCH:
    "api/tranche1/work/checker-search?page=:page&size=:size&quarter=:qt&tranchetype=:tt&type=:type&word=:word&year=:year",
  TRANCHE1_MAKER_ALL:
    "api/tranche1/work/maker?page=:page&size=:size&quarter=:qt&rejectedFlag=:rejectedFlag&tranchetype=:tt&year=:year",
  TRANCHE1_MAKER_SEARCH:
    "api/tranche1/work/maker-search?page=:page&size=:size&quarter=:qt&tranchetype=:tt&type=:type&word=:word&year=:year",
  TRANCHE1_INFO_ALL:
    "api/tranche1/work/info?page=:page&size=:size&quarter=:qt&tranchetype=:tt&year=:year",
  TRANCHE1_INFO_SEARCH:
    "api/tranche1/work/info-search?page=:page&size=:size&quarter=:qt&tranchetype=:tt&type=:type&word=:word&year=:year",
  TRANCHE1_APPROVE: "api/tranche1/work/approve",
  TRANCHE1_REJECT: "api/tranche1/work/reject",
  TRANCHE1_DOWNLOAD: "api/tranche1/work/download-excel?isMakerOrChecker=:isMakerOrChecker&quarter=:quarter&status=:status&year=:year",
  WORK_FLOW_ALL:
    "api/workflow?page=:page&size=:size&sort=:sort",
  WORK_FLOW_SEARCH_ALL:
    "api/workflow/search?page=:page&size=:size&sort=:sort&type=:type&word=:word",
  WORK_FLOW_UNMAPPED:
    "api/dct/unmapped?page=:page&size=:size&sort=:sort&department=:dpt&riskType=:risk&tracheType=:tranche",
  WORK_FLOW_MAPPED:
    "api/dct/mapped?page=:page&size=:size&sort=:sort&department=:dpt&tracheType=:tranche",
  WORK_FLOW_BY_ID: "api/workflow/:id",
  WORK_FLOW_DCT: "api/workflow/dcts/:id",
  ADD_WORKFLOW_DCTS: "api/workflow/dcts-add/:id",
  DELETE_WORKFLOW_DCTS: "api/workflow/dcts-delete/:id",
  WORK_FLOW_USER: "api/workflow/users/:id",
  DCT_ALL:
    "api/dct?page=:page&size=:size&sort=:sort&type=:type&word=:word",
  DCT_SEARCH_ALL:
    "api/dct/search?page=:page&size=:size&sort=:sort&type=:type&word=:word",
  DCT: "api/dct",
  DCT_ID: "api/dct/:id",
  DCT_TYPS: "api/dct/distinct-departments",
  TRANCHE_TYPES: "api/dct/distinct-tranchetypes",
  TRANCHE1_FILE_UPLOAD:
    "api/file/upload?trancheid=:id&tranchetype=:tt",
  TRANCHE1_FILE_DOWNLOAD: "api/file/download/:id",
  TRANCHE2_GET_ALL:
    "api/tranche:ttn/work?page=:page&size=:size",
  TRANCHE2_CHECKER_ALL:
  "api/tranche2/work/checker?page=:page&size=:size&quarter=:qt&tranchetype=:tt&year=:year",
  TRANCHE2_CHECKER_SEARCH:
    "api/tranche:ttn/work/checker?page=:page&size=:size&quarter=:qt&tranchetype=:tt&type=:type&word=:word&year=:year",
  TRANCHE2_MAKER_ALL:
  "api/tranche2/work/maker?page=:page&size=:size&quarter=:qt&rejectedFlag=:rejectedFlag&tranchetype=:tt&year=:year",
  TRANCHE2_MAKER_SEARCH:
    "api/tranche:ttn/work/maker?page=:page&size=:size&quarter=:qt&tranchetype=:tt&type=:type&word=:word&year=:year",
  TRANCHE2_INFO_ALL:
    "api/tranche:ttn/work/info?page=:page&size=:size&quarter=:qt&tranchetype=:tt&year=:year",
  TRANCHE2_INFO_SEARCH:
    "api/tranche:ttn/work/info?page=:page&size=:size&quarter=:qt&tranchetype=:tt&type=:type&word=:word&year=:year",
  TRANCHE2_APPROVE: "api/tranche:ttn/work/approve",
  TRANCHE2_REJECT: "api/tranche:ttn/work/reject",
  TRANCHE3_MAKER_ALL:
  "api/tranche3/work/maker?page=:page&size=:size&quarter=:qt&rejectedFlag=:rejectedFlag&tranchetype=:tt&year=:year",
  AUDIT_GET:
    "api/tranche:tranche/audit?page=:page&size=:size&quarter=:qt&tranchetype=:tt&year=:year&sort=dctNumber",
  AUDIT_SEARCH:
    "api/tranche:tranche/audit?dctnumber=:dct&page=:page&size=:size&quarter=:qt&tranchetype=:tt&year=:year&sort=dctNumber",
  REPORTS: "api/reports?quarter=:qt&year=:year",
  SUBMITTEDRECORD:"api/reports/submittedRecords?quarter=:qt&year=:year&trancheType=:trancheType",
  SUBMITTEDVALUE:"/api/reports/submittedRecordValues?quarter=:qt&year=:year&trancheType=:trancheType&username=:username&pageSize=:size",
  SUBMIT_BY_OWNER:"/api/reports/submittedRecordValuesByOwner?currentOwner=:co&quarter=:qt&trancheType=:tt&username=:username&year=:year",
  ADMIN_REPORTS: "api/reports/admin?quarter=:qt&year=:year",
  GET_DCT_UNITS: "api/dct/distinct-dataunits",
  GET_QUARTERS: "api/utilities/quarters?dateReceived=:date",
  IMPORT:
    "api/file/import?quarter=:qt&tranchetype=:tt&year=:year",
  // TRANCHE2_DOWNLOAD:'api/tranche:ttn/work/download-excel?quarter=:qt&tranchetype=:tt&year=:year',
  TRANCHE2_DOWNLOAD:
    "api/tranche:ttn/download-excel?quarter=:qt&year=:year",

  TRANCHE1_UNCLEARED_DOWNLOAD:
    "api/tranche1/work/uncleared/download-excel?quarter=:qt&year=:year",
  TRANCHE2_UNCLEARED_DOWNLOAD:
    "api/tranche2/work/uncleared/download-excel?quarter=:qt&year=:year",
  TRANCHE3_UNCLEARED_DOWNLOAD:
  "api/tranche3/work/uncleared/download-excel?quarter=:qt&year=:year",

  TRANCHE2_UPDATE: "api/tranche:ttn/work/update",
  TRANCHE1_UPDATE:
    "api/tranche1/work/update?tranchetype=:tt",
  RISK_TYPES_ALL: "api/dct/distinct-risktype/2",
  UNMAPPED_DCT_BY_RISK_TYPE: "api/dct/unmappedTrancheTwoDcts?page=:page&size=:size&department=:dpt&riskType=:risk&tracheType=:tranche",
  MAPPED_DCT_BY_RISK_TYPE: "api/dct/mappedTrancheTwoDcts?page=:page&size=:size&department=:dpt&riskType=:risk&tracheType=:tranche"
  // api/dct/allDctsByRiskType?page=:page&size=:size&riskType=:risk&tracheType=:tranche",
};

export const SERVER_PATHS = {
  // DEV: "http://18.191.157.185:8080/rbs-obc-1.0-SNAPSHOT/",
  // DEV: "http://ec2-3-15-215-18.us-east-2.compute.amazonaws.com:8080/rbs-obc-1.0-SNAPSHOT/"
  // DEV:"http://172.16.15.226:8080/rbs-api/"
  DEV:'http://3.95.36.75:8019/'
};

export const FORMATS = {
  date: "DD/MM/YYYY",
  date_time: "DD/MM/YYYY HH:MM:SS",
};
