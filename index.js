var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var tableContent = document.getElementById('content');
var element = document.getElementById("btn");
var titleContent = document.querySelector('.table-title');
var Table = /** @class */ (function () {
    function Table(path) {
        this.path = path;
    }
    Table.prototype.onInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAll()];
                    case 1:
                        _a.sent();
                        this.verifyTitle();
                        return [2 /*return*/];
                }
            });
        });
    };
    Table.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fetch("http://localhost:9090/api/".concat(this.path))
                            .then(function (res) { return res.json(); })
                            .then(function (data) {
                            _this.generateTable(data.content);
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    Table.prototype.generateElement = function (tag, text) {
        var elementTag = document.createElement(tag);
        if (text) {
            elementTag.innerText = text;
            //Students
            if (text == 'id') {
                elementTag.innerText = "ID";
            }
            if (text == 'firstName') {
                elementTag.innerText = "First Name";
            }
            if (text == 'lastName') {
                elementTag.innerText = "Last Name";
            }
            if (text == 'age') {
                elementTag.innerText = "Age";
            }
            if (text == 'email') {
                elementTag.innerText = "Email";
            }
            //Courses
            if (text == 'name') {
                elementTag.innerText = "Name";
            }
            if (text == 'teacherName') {
                elementTag.innerText = "Teacher Name";
            }
            if (text == 'classNumber') {
                elementTag.innerText = "Class Number";
            }
            if (text == 'startDate') {
                elementTag.innerText = "Start Date";
            }
        }
        return elementTag;
    };
    ;
    Table.prototype.appendElement = function (parent, child) {
        parent.appendChild(child);
        return parent;
    };
    ;
    Table.prototype.generateTable = function (data) {
        var _this = this;
        if (data.length === 0) {
            return;
        }
        var objectKeysParameters = Object.keys(data[0]);
        var table = this.generateElement('table');
        //header
        this.appendElement(table, objectKeysParameters.slice(0, 5)
            .map(function (objParam) { return _this.generateElement('th', objParam); })
            .reduce(this.appendElement, this.generateElement('tr')));
        //values
        var makeRow = function (acc, row) {
            return _this.appendElement(acc, objectKeysParameters.slice(0, 5)
                .map(function (objParam) { return _this.generateElement('td', row[objParam]); })
                .reduce(_this.appendElement, _this.generateElement('tr')));
        };
        data.reduce(makeRow, table);
        tableContent === null || tableContent === void 0 ? void 0 : tableContent.appendChild(table);
    };
    ;
    Table.prototype.verifyTitle = function () {
        if (this.path === 'students') {
            titleContent.innerHTML = "Students";
        }
        if (this.path === 'courses') {
            titleContent.innerHTML = "Courses";
        }
    };
    Table.prototype.changePath = function () {
        element === null || element === void 0 ? void 0 : element.addEventListener("click", this.changePath);
        this.path === 'students' ? this.path = 'courses' : this.path = 'students';
        this.verifyTitle();
        if (tableContent !== null) {
            tableContent.innerHTML = '';
        }
        this.getAll();
    };
    return Table;
}());
var myTable = new Table("courses");
myTable.onInit();
