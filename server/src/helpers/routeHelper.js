import BaseJoi from 'joi';
import DateExtension from 'joi-date-extensions';
import { join } from 'path';
const Joi = BaseJoi.extend(DateExtension);

export var validateBody = (schema) => {
  return (req, res, next) => {
    const result = req.method != 'GET'? Joi.validate(req.body, schema): Joi.validate(req.query, schema);
    if (result.error) {
      return res.status(400).json(result.error);
    }

    if (!req.value) { req.value = {}; }
    req.value['body'] = result.value;
    next();
  }
}

export var  schemas = {
  registerSchema: Joi.object().keys({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required()
  }),
  loginSchema: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    alias: Joi.string().required(),
  }),
  rootLoginSchema: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    otp: Joi.string().optional().allow(null).empty(''),
  }),
  rootCheckSchema: Joi.object().keys({
    email: Joi.string().required(),
    alias: Joi.string().optional().allow(null).empty(''),
  }),
  resetPassword: Joi.object().keys({
    email: Joi.string().email().required(),
    verificationCode: Joi.string().required(),
    password: Joi.string().required()
  }),
  addUserSchema: Joi.object().keys({
    firstname: Joi.string().required(),
    lastname: Joi.string().allow(null).empty(''),
    email: Joi.string().email().required(),
    phone: Joi.string().optional().allow(null).empty(''),
  }),
  sendResetPassword: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
  groupSchema: Joi.object().keys({
    name: Joi.string().required(),
    file: Joi.string().optional().allow(null).empty(''),
    targets: Joi.array().items(Joi.object().keys({
      firstname: Joi.string().required(),
      lastname: Joi.string().optional().allow(null).empty(''),
      email: Joi.string().email().required(),
      phone: Joi.string().optional().allow(null).empty(''),
      position: Joi.string().optional().allow(null).empty(''),
      photo: Joi.string().optional().allow(null).empty(''),
      mode: Joi.string().required(),
    })) 
  }),
  groupPatch: Joi.object().keys({
    name: Joi.string().required(),
    targets: Joi.array().items(Joi.object().keys({
      groupId: Joi.number().optional().allow(null).empty(''),
      id: Joi.number().optional().allow(null).empty(''),
      firstname: Joi.string().required(),
      lastname: Joi.string().optional().allow(null).empty(''),
      email: Joi.string().email().required(),
      phone: Joi.string().optional().allow(null).empty(''),
      position: Joi.string().optional().allow(null).empty(''),
      photo: Joi.string().optional().allow(null).empty(''),
      mode: Joi.string().required(),
    }))
  }),
  targetCreate: Joi.object().keys({
    groupId: Joi.number().required(),
    firstname: Joi.string().required(),
    lastname: Joi.string().optional().allow(null).empty(''),
    email: Joi.string().email().required(),
    phone: Joi.string().optional().allow(null).empty(''),
    position: Joi.string().optional().allow(null).empty(''),
    photo: Joi.string().optional().allow(null).empty(''),
  }),
  sendTestEmail: Joi.object().keys({
    email: Joi.string().email().required(),
    from_address: Joi.string().required(),
    host: Joi.string().required(),
    username: Joi.string().optional().allow(null).empty(''),
    password: Joi.string().optional().allow(null).empty(''),
    senderId: Joi.number().optional().allow(null).empty(''),
    headers: Joi.array().items(Joi.object().keys({
      key: Joi.string().required(),
      value: Joi.string().required(),
    }))
  }),
  metaSchemaLicence: Joi.object().keys({
    licence: Joi.string().required(),
  }),
  metaSchemaDays: Joi.object().keys({
    day: Joi.number().min(1).required(),
  }),
  metaKeys: Joi.object().keys({
    licence: Joi.string().optional().allow(null).empty(''),
    from: Joi.string().optional().allow(null).empty(''),
    host: Joi.string().optional().allow(null).empty(''),
    username: Joi.string().optional().allow(null).empty(''),
    password: Joi.string().optional().allow(null).empty(''),
  }),
  metaDays: Joi.object().keys({
    licence: Joi.string().optional().allow(null).empty('')
  }),
  senderSchema: Joi.object().keys({
    name: Joi.string().required(),
    from_address: Joi.string().required(),
    host: Joi.string().required(),
    username: Joi.string().optional().allow(null).empty(''),
    password: Joi.string().optional().allow(null).empty(''),
    ignore_cert_errors: Joi.number().min(0).max(1).required(),
    subAttackTypeId: Joi.number().min(0).required(),
    headers: Joi.array().items(Joi.object().keys({
      key: Joi.string().required(),
      value: Joi.string().required(),
    }))
  }),
  senderCallSchema: Joi.object().keys({
    apiKey: Joi.string().required(),
    callerId: Joi.number().min(1).required(),
    apiToken: Joi.string().required(),
    name: Joi.string().required(),
    gateway: Joi.number().min(1).required(),
    sId: Joi.string().required(),
    subAttackTypeId: Joi.number().min(1).required(),
  }),
  voiceTestCallSchema: Joi.object().keys({
    apiKey: Joi.string().required(),
    callerId: Joi.number().min(1).required(),
    apiToken: Joi.string().required(),
    name: Joi.string().required(),
    gateway: Joi.number().min(1).required(),
    sId: Joi.string().required(),
    phone: Joi.string().optional().allow(null).empty(''),
    subAttackTypeId: Joi.number().min(1).required(),
  }),
  senderSMSSchema: Joi.object().keys({
    name: Joi.string().required(),
    senderId: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().optional().allow(null).empty(''),
    gateway: Joi.number().min(1).required(),
    subAttackTypeId: Joi.number().min(1).optional().allow(null),
  }),
  smsSchemaTest: Joi.object().keys({
    name: Joi.string().required(),
    from_address: Joi.string().required(),
    username: Joi.string().required(),
    password: Joi.string().optional().allow(null).empty(''),
    senderId: Joi.number().optional().allow(null).empty(''),
    gateway: Joi.number().min(1).required(),
    phone: Joi.string().optional().allow(null).empty(''),
  }),
  emailtrack: Joi.object().keys({
    rid: Joi.string().required(),
  }),
  emailSchema: Joi.object().keys({
    name: Joi.string().required(),
    subject: Joi.string().required(),
    html: Joi.string().required(),
    subAttackTypeId: Joi.number().min(1).required(),
  }),
  smsSchema: Joi.object().keys({
    name: Joi.string().required(),
    body: Joi.string().required(),
    subAttackTypeId: Joi.number().min(1).required(),
  }),
  simulationOneSchema: Joi.object().keys({
    campaignName: Joi.string().required(),
    attackTypeId: Joi.number().min(1).required(),
    url: Joi.string().required(),
    groupIds: Joi.array().min(1).items(Joi.number().min(1)).required(),
    templateId: Joi.number().min(1).required(),
    campaignType: Joi.string().required(),
    pageId: Joi.number().min(1).required(),
    senderId: Joi.number().min(1).required(),
    scheduledAt: Joi.date().min(1).required(),
  }),
  simulationOneVishingSchema: Joi.object().keys({
    campaignName: Joi.string().required(),
    attackTypeId: Joi.number().min(1).required(),
    groupIds: Joi.array().min(1).items(Joi.number().min(1)).required(),
    senderId: Joi.number().min(1).required(),
    scheduledAt: Joi.date().min(1).required(),
    campaignType: Joi.string().required(),
  }),
  simulationTwoVishingSchema: Joi.object().keys({
    campaignId: Joi.number().min(1).required(),
    senderId: Joi.number().min(1).required(),
    scheduledAt: Joi.date().min(1).required(),
  }),
  simulationOneRansomwareSchema: Joi.object().keys({
    campaignName: Joi.string().required(),
    attackTypeId: Joi.number().min(1).required(),
    url: Joi.string().required(),
    groupIds: Joi.array().min(1).items(Joi.number().min(1)).required(),
    templateId: Joi.number().min(1).required(),
    pageId: Joi.number().min(1).required(),
    senderId: Joi.number().min(1).required(),
    scheduledAt: Joi.date().min(1).required(),
    identifier: Joi.string().required(),
    file: Joi.string().optional().allow(null).empty(''),
    campaignType: Joi.string().required(),
  }),
  knowledgeSchema: Joi.object().keys({
    campaignId: Joi.number().min(1).required(),
    videoList: Joi.array().optional().allow(null).empty(''),
    scheduledAt: Joi.date().min(1).required(),
  }),
  reminderLMSSchema: Joi.object().keys({
    courseId: Joi.number().min(1).required(),
    simulationId: Joi.number().min(1).required(),
    percentage: Joi.number().min(0).max(100).required(),
    templateId: Joi.number().min(1).required(),
    scheduledAt: Joi.date().min(1).required(),
  }),
  simulationLMSSchema: Joi.object().keys({
    campaignName: Joi.string().required(),
    groupId: Joi.number().min(1).required(),
    templateId: Joi.number().min(1).required(),
    courseId: Joi.number().min(1).required(),
    scheduledAt: Joi.date().min(1).required(),
  }),
  quizSchema: Joi.object().keys({
    campaignId: Joi.number().min(1).required(),
    scheduledAt: Joi.date().min(1).required(),
  }),
  simulationTwoSchema: Joi.object().keys({
    campaignId: Joi.number().min(1).required(),
    url: Joi.string().required(),
    templateId: Joi.number().min(1).required(),
    pageId: Joi.number().min(1).required(),
    senderId: Joi.number().min(1).required(),
    scheduledAt: Joi.date().min(1).required(),
  }),
  simulationResult: Joi.object().keys({
    page: Joi.number().min(1).optional().allow(null).empty(1),
    search: Joi.string().optional().allow(null).empty(''),
    campaignId: Joi.number().min(1).required(),
  }),
  simulationCompleteSchema: Joi.object().keys({
    campaignId: Joi.number().min(1).required(),
    step: Joi.number().min(1).max(4).required(),
  }),
  pageSchema: Joi.object().keys({
    name: Joi.string().required(),
    body: Joi.string().required(),
    capture_credentials: Joi.number().min(0).max(1).required(),
    capture_passwords: Joi.number().min(0).max(1).required(),
    subAttackTypeId: Joi.number().min(1).required(),
    redirect_url: Joi.string().optional().allow(null).empty(''),
    blue_page: Joi.number().min(0).max(1).required(),
  }),
  headerCreate: Joi.object().keys({
    senderId: Joi.number().min(1).required(),
    key: Joi.string().required(),
    value: Joi.string().required(),
  }),
  quizUpdate: Joi.object().keys({
    token: Joi.string().required(),
    status: Joi.string().required(),
    score: Joi.string().required(),
    total: Joi.string().required(),
  }),
  importSite: Joi.object().keys({
    url: Joi.string().required(),
  }),
  quizCreate: Joi.object().keys({
    name: Joi.string().required(),
    courseId: Joi.number().min(1).required(),
  }),
  importMail: Joi.object().keys({
    raw: Joi.string().required(),
    changeUrls: Joi.number().min(0).max(1).required(),
  }),
  filterCSV: Joi.object().keys({
    filter: Joi.string().optional().allow(null).empty(''),
    campaignId: Joi.number().required(),
    step: Joi.number().required(),
  }),
  resultGetSchema: Joi.object().keys({
    limit: Joi.number().optional().allow(null).empty(''),
    search: Joi.string().optional().allow(null).empty(''),
    page: Joi.number().optional().allow(null).empty(''),
    filter: Joi.string().optional().allow(null).empty(''),
    groups: Joi.string().optional().allow(null).empty(''),
    campaignId: Joi.number().required(),
    step: Joi.number().required(),
  }),
  resultSchema: Joi.object().keys({
    token: Joi.string().required(),
    action: Joi.string().required(),
    details: Joi.string().optional().allow(null).empty(''),
    created_at: Joi.date().required(),
  }),
  userProfile: Joi.object().keys({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
  }),
  changePassword: Joi.object().keys({
    oldPass: Joi.string().required(),
    password: Joi.string().required(),
  }),
  createPassword: Joi.object().keys({
    email: Joi.string().email().required(),
    token: Joi.string().required(),
    password: Joi.string().required(),
  }),
  sentNewPasswordLink: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
  reportMail: Joi.object().keys({
    header: Joi.string().required(),
    body: Joi.string().required(),
    attachments: Joi.array().optional().allow(null).empty('').items(Joi.object().keys({
        Key: Joi.string().required(),
        Value: Joi.string().required(),
    })),
  }),
  metaSchema: Joi.object().keys({
    keys: Joi.string().required(),
  }),
  metaSchema: Joi.object().keys({
    keys: Joi.string().required(),
  }),
  callerSchema:  Joi.object().keys({
    apiKey: Joi.string().required(),
    apiToken: Joi.string().required(),
    sId: Joi.string().required(),
  }),
  awarenessSchema: Joi.object().keys({
    title: Joi.string().required(),
  }),
  listAttachments: Joi.object().keys({
    templateId: Joi.number().min(1).required(),
  }),
  sectionSchema: Joi.object().keys({
    sectionId: Joi.number().optional().allow(null).empty(''),
    courseId: Joi.number().min(1).required(),
    name: Joi.string().required(),
    position: Joi.number().min(1).required(),
  }),
  lectureSchema: Joi.object().keys({
    file: Joi.any().required(),
    name: Joi.string().required(),
    sectionId: Joi.number().min(1).required(),
  }),
  lectureTrackingSchema: Joi.object().keys({
    duration: Joi.number().required(),
    lectureId: Joi.number().min(1).required(),
  }),
  quizAnswerSchema: Joi.object().keys({
    quizId: Joi.number().min(1).required(),
    questionId: Joi.number().min(1).required(),
    optionId: Joi.number().min(1).required(),
  }),
  quizQuestionSchema:  Joi.object().keys({
    quizId: Joi.number().min(1).required(),
    name: Joi.string().required(),    
  }),
  quizOptionSchema:  Joi.object().keys({
    attachments: Joi.array().optional().allow(null).empty('').items(Joi.object().keys({
      name: Joi.string().required(),
      questionId: Joi.string().required(),
      correct: Joi.string().required(),
    })),
  }),
  listCampaigns: Joi.object().keys({
    page: Joi.number().min(1).optional().allow(null).empty(0),
    search: Joi.string().optional().allow(null).empty(''),
    sort: Joi.string().valid('name','recent').optional().allow(null).empty(''),
    events: Joi.string().optional().allow(null).empty(''),
    fromDate: Joi.string().optional().regex(/^[0-9]{4}\/[0-9]{2}\/[0-9]{2}$/).allow(null).empty(''),
    toDate: Joi.string().optional().regex(/^[0-9]{4}\/[0-9]{2}\/[0-9]{2}$/).allow(null).empty(''),
  }),
  /* courseSchema: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    thumbnail: 
  }), */
  changeEmployeePassword: Joi.object().keys({
		password: Joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{8,20}$/).min(8).required().error((err) => {
			return 'Password has to be between 8 to 15 characters which contain at least one numeric digit, one uppercase and one lowercase letter'
		}),
		confhash: Joi.string().valid(Joi.ref('password')).required().error((err) => {
			return "Password does not match."
		}),
  }),
  employeeResetPassword: Joi.object().keys({
    id: Joi.string().required(),
  }),
  employeePolicyEditSchema: Joi.object().keys({
    list: Joi.array().required(),
  }),


}