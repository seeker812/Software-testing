// @ts-nocheck
function stryNS_9fa48() {
  var g = typeof globalThis === 'object' && globalThis && globalThis.Math === Math && globalThis || new Function("return this")();
  var ns = g.__stryker__ || (g.__stryker__ = {});
  if (ns.activeMutant === undefined && g.process && g.process.env && g.process.env.__STRYKER_ACTIVE_MUTANT__) {
    ns.activeMutant = g.process.env.__STRYKER_ACTIVE_MUTANT__;
  }
  function retrieveNS() {
    return ns;
  }
  stryNS_9fa48 = retrieveNS;
  return retrieveNS();
}
stryNS_9fa48();
function stryCov_9fa48() {
  var ns = stryNS_9fa48();
  var cov = ns.mutantCoverage || (ns.mutantCoverage = {
    static: {},
    perTest: {}
  });
  function cover() {
    var c = cov.static;
    if (ns.currentTestId) {
      c = cov.perTest[ns.currentTestId] = cov.perTest[ns.currentTestId] || {};
    }
    var a = arguments;
    for (var i = 0; i < a.length; i++) {
      c[a[i]] = (c[a[i]] || 0) + 1;
    }
  }
  stryCov_9fa48 = cover;
  cover.apply(null, arguments);
}
function stryMutAct_9fa48(id) {
  var ns = stryNS_9fa48();
  function isActive(id) {
    if (ns.activeMutant === id) {
      if (ns.hitCount !== void 0 && ++ns.hitCount > ns.hitLimit) {
        throw new Error('Stryker: Hit count limit reached (' + ns.hitCount + ')');
      }
      return true;
    }
    return false;
  }
  stryMutAct_9fa48 = isActive;
  return isActive(id);
}
import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "./api/axios";
import React from "react";
const USER_REGEX = stryMutAct_9fa48("4") ? /^[A-z][^A-z0-9-_]{3,23}$/ : stryMutAct_9fa48("3") ? /^[A-z][A-z0-9-_]$/ : stryMutAct_9fa48("2") ? /^[^A-z][A-z0-9-_]{3,23}$/ : stryMutAct_9fa48("1") ? /^[A-z][A-z0-9-_]{3,23}/ : stryMutAct_9fa48("0") ? /[A-z][A-z0-9-_]{3,23}$/ : (stryCov_9fa48("0", "1", "2", "3", "4"), /^[A-z][A-z0-9-_]{3,23}$/);
const PWD_REGEX = stryMutAct_9fa48("19") ? /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).$/ : stryMutAct_9fa48("18") ? /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^!@#$%]).{8,24}$/ : stryMutAct_9fa48("17") ? /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.[!@#$%]).{8,24}$/ : stryMutAct_9fa48("16") ? /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?!.*[!@#$%]).{8,24}$/ : stryMutAct_9fa48("15") ? /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^0-9])(?=.*[!@#$%]).{8,24}$/ : stryMutAct_9fa48("14") ? /^(?=.*[a-z])(?=.*[A-Z])(?=.[0-9])(?=.*[!@#$%]).{8,24}$/ : stryMutAct_9fa48("13") ? /^(?=.*[a-z])(?=.*[A-Z])(?!.*[0-9])(?=.*[!@#$%]).{8,24}$/ : stryMutAct_9fa48("12") ? /^(?=.*[a-z])(?=.*[^A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/ : stryMutAct_9fa48("11") ? /^(?=.*[a-z])(?=.[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/ : stryMutAct_9fa48("10") ? /^(?=.*[a-z])(?!.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/ : stryMutAct_9fa48("9") ? /^(?=.*[^a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/ : stryMutAct_9fa48("8") ? /^(?=.[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/ : stryMutAct_9fa48("7") ? /^(?!.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/ : stryMutAct_9fa48("6") ? /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}/ : stryMutAct_9fa48("5") ? /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/ : (stryCov_9fa48("5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19"), /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/);
const REGISTER_URL = stryMutAct_9fa48("20") ? "" : (stryCov_9fa48("20"), "/register");
function Register() {
  if (stryMutAct_9fa48("21")) {
    {}
  } else {
    stryCov_9fa48("21");
    const userRef = useRef();
    const errRef = useRef();
    const [user, setUser] = useState(stryMutAct_9fa48("22") ? "Stryker was here!" : (stryCov_9fa48("22"), ""));
    const [validName, setValidName] = useState(stryMutAct_9fa48("23") ? true : (stryCov_9fa48("23"), false));
    const [userFocus, setUserFocus] = useState(stryMutAct_9fa48("24") ? true : (stryCov_9fa48("24"), false));
    const [pwd, setPwd] = useState(stryMutAct_9fa48("25") ? "Stryker was here!" : (stryCov_9fa48("25"), ""));
    const [validPwd, setValidPwd] = useState(stryMutAct_9fa48("26") ? true : (stryCov_9fa48("26"), false));
    const [pwdFocus, setPwdFocus] = useState(stryMutAct_9fa48("27") ? true : (stryCov_9fa48("27"), false));
    const [matchPwd, setMatchPwd] = useState(stryMutAct_9fa48("28") ? "Stryker was here!" : (stryCov_9fa48("28"), ""));
    const [validMatch, setValidMatch] = useState(stryMutAct_9fa48("29") ? true : (stryCov_9fa48("29"), false));
    const [matchFocus, setMatchFocus] = useState(stryMutAct_9fa48("30") ? true : (stryCov_9fa48("30"), false));
    const [errMsg, setErrMsg] = useState(stryMutAct_9fa48("31") ? "Stryker was here!" : (stryCov_9fa48("31"), ""));
    const [success, setSuccess] = useState(stryMutAct_9fa48("32") ? true : (stryCov_9fa48("32"), false));
    useEffect(() => {
      if (stryMutAct_9fa48("33")) {
        {}
      } else {
        stryCov_9fa48("33");
        userRef.current.focus();
      }
    }, stryMutAct_9fa48("34") ? ["Stryker was here"] : (stryCov_9fa48("34"), []));
    useEffect(() => {
      if (stryMutAct_9fa48("35")) {
        {}
      } else {
        stryCov_9fa48("35");
        const result = USER_REGEX.test(user);
        console.log(result);
        console.log(user);
        setValidName(result);
      }
    }, stryMutAct_9fa48("36") ? [] : (stryCov_9fa48("36"), [user]));
    useEffect(() => {
      if (stryMutAct_9fa48("37")) {
        {}
      } else {
        stryCov_9fa48("37");
        const result = PWD_REGEX.test(pwd);
        console.log(result);
        console.log(pwd);
        setValidPwd(result);
        const match = stryMutAct_9fa48("40") ? pwd !== matchPwd : stryMutAct_9fa48("39") ? false : stryMutAct_9fa48("38") ? true : (stryCov_9fa48("38", "39", "40"), pwd === matchPwd);
        setValidMatch(match);
      }
    }, stryMutAct_9fa48("41") ? [] : (stryCov_9fa48("41"), [pwd, matchPwd]));
    useEffect(() => {
      if (stryMutAct_9fa48("42")) {
        {}
      } else {
        stryCov_9fa48("42");
        setErrMsg(stryMutAct_9fa48("43") ? "Stryker was here!" : (stryCov_9fa48("43"), ""));
      }
    }, stryMutAct_9fa48("44") ? [] : (stryCov_9fa48("44"), [user, pwd, matchPwd]));
    async function handleSubmit(e) {
      if (stryMutAct_9fa48("45")) {
        {}
      } else {
        stryCov_9fa48("45");
        e.preventDefault();
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if (stryMutAct_9fa48("48") ? !v1 && !v2 : stryMutAct_9fa48("47") ? false : stryMutAct_9fa48("46") ? true : (stryCov_9fa48("46", "47", "48"), (stryMutAct_9fa48("49") ? v1 : (stryCov_9fa48("49"), !v1)) || (stryMutAct_9fa48("50") ? v2 : (stryCov_9fa48("50"), !v2)))) {
          if (stryMutAct_9fa48("51")) {
            {}
          } else {
            stryCov_9fa48("51");
            setErrMsg(stryMutAct_9fa48("52") ? "" : (stryCov_9fa48("52"), "Invalid Entry"));
            return;
          }
        }
        try {
          if (stryMutAct_9fa48("53")) {
            {}
          } else {
            stryCov_9fa48("53");
            const response = await axios.post(REGISTER_URL, JSON.stringify(stryMutAct_9fa48("54") ? {} : (stryCov_9fa48("54"), {
              user,
              pwd
            })), stryMutAct_9fa48("55") ? {} : (stryCov_9fa48("55"), {
              headers: stryMutAct_9fa48("56") ? {} : (stryCov_9fa48("56"), {
                "Content-Type": stryMutAct_9fa48("57") ? "" : (stryCov_9fa48("57"), "application/json")
              })
              // withCredentials: true,
            }));
            console.log(response.data);
            console.log(response.accessToken);
            console.log(JSON.stringify(response));
            setSuccess(stryMutAct_9fa48("58") ? false : (stryCov_9fa48("58"), true));
          }
        } catch (err) {
          if (stryMutAct_9fa48("59")) {
            {}
          } else {
            stryCov_9fa48("59");
            if (stryMutAct_9fa48("62") ? false : stryMutAct_9fa48("61") ? true : stryMutAct_9fa48("60") ? err?.response : (stryCov_9fa48("60", "61", "62"), !(stryMutAct_9fa48("63") ? err.response : (stryCov_9fa48("63"), err?.response)))) {
              if (stryMutAct_9fa48("64")) {
                {}
              } else {
                stryCov_9fa48("64");
                setErrMsg(stryMutAct_9fa48("65") ? "" : (stryCov_9fa48("65"), "No Server Response"));
              }
            } else if (stryMutAct_9fa48("68") ? err.response?.status !== 409 : stryMutAct_9fa48("67") ? false : stryMutAct_9fa48("66") ? true : (stryCov_9fa48("66", "67", "68"), (stryMutAct_9fa48("69") ? err.response.status : (stryCov_9fa48("69"), err.response?.status)) === 409)) {
              if (stryMutAct_9fa48("70")) {
                {}
              } else {
                stryCov_9fa48("70");
                setErrMsg(stryMutAct_9fa48("71") ? "" : (stryCov_9fa48("71"), "Username Taken"));
              }
            } else {
              if (stryMutAct_9fa48("72")) {
                {}
              } else {
                stryCov_9fa48("72");
                setErrMsg(stryMutAct_9fa48("73") ? "" : (stryCov_9fa48("73"), "Registration Failed"));
              }
            }
          }
        }
      }
    }
    return <>
      {success ? <section>
          <h1>Success!</h1>
          <p>
            <a href="#">Sign In</a>
          </p>
        </section> : <section>
          <p ref={errRef} className={errMsg ? stryMutAct_9fa48("74") ? "" : (stryCov_9fa48("74"), "errmsg") : stryMutAct_9fa48("75") ? "" : (stryCov_9fa48("75"), "offscreen")} aria-live="assertive">
            {errMsg}
          </p>
          <h1>Register</h1>
          <form onSubmit={handleSubmit} autoComplete="off">
            <label htmlFor="username">
              Username:
              <FontAwesomeIcon icon={faCheck} className={validName ? stryMutAct_9fa48("76") ? "" : (stryCov_9fa48("76"), "valid") : stryMutAct_9fa48("77") ? "" : (stryCov_9fa48("77"), "hide")} />
              <FontAwesomeIcon icon={faTimes} className={(stryMutAct_9fa48("80") ? validName && !user : stryMutAct_9fa48("79") ? false : stryMutAct_9fa48("78") ? true : (stryCov_9fa48("78", "79", "80"), validName || (stryMutAct_9fa48("81") ? user : (stryCov_9fa48("81"), !user)))) ? stryMutAct_9fa48("82") ? "" : (stryCov_9fa48("82"), "hide") : stryMutAct_9fa48("83") ? "" : (stryCov_9fa48("83"), "invalid")} />
            </label>
            <input type="text" id="username" ref={userRef} autoComplete="off" onChange={stryMutAct_9fa48("84") ? () => undefined : (stryCov_9fa48("84"), e => setUser(e.target.value))} required aria-invalid={validName ? stryMutAct_9fa48("85") ? "" : (stryCov_9fa48("85"), "false") : stryMutAct_9fa48("86") ? "" : (stryCov_9fa48("86"), "true")} aria-describedby="uidnote" onFocus={stryMutAct_9fa48("87") ? () => undefined : (stryCov_9fa48("87"), () => setUserFocus(stryMutAct_9fa48("88") ? false : (stryCov_9fa48("88"), true)))} onBlur={stryMutAct_9fa48("89") ? () => undefined : (stryCov_9fa48("89"), () => setUserFocus(stryMutAct_9fa48("90") ? true : (stryCov_9fa48("90"), false)))} />

            <p id="uidnote" className={(stryMutAct_9fa48("93") ? userFocus && user || !validName : stryMutAct_9fa48("92") ? false : stryMutAct_9fa48("91") ? true : (stryCov_9fa48("91", "92", "93"), (stryMutAct_9fa48("95") ? userFocus || user : stryMutAct_9fa48("94") ? true : (stryCov_9fa48("94", "95"), userFocus && user)) && (stryMutAct_9fa48("96") ? validName : (stryCov_9fa48("96"), !validName)))) ? stryMutAct_9fa48("97") ? "" : (stryCov_9fa48("97"), "instructions") : stryMutAct_9fa48("98") ? "" : (stryCov_9fa48("98"), "offscreen")}>
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 characters.
              <br />
              Must begin with a letter.
              <br />
              Letters, numbers, underscores, hyphens allowed.
            </p>

            <label htmlFor="password">
              Password:
              <FontAwesomeIcon icon={faCheck} className={validPwd ? stryMutAct_9fa48("99") ? "" : (stryCov_9fa48("99"), "valid") : stryMutAct_9fa48("100") ? "" : (stryCov_9fa48("100"), "hide")} />
              <FontAwesomeIcon icon={faTimes} className={(stryMutAct_9fa48("103") ? validPwd && !pwd : stryMutAct_9fa48("102") ? false : stryMutAct_9fa48("101") ? true : (stryCov_9fa48("101", "102", "103"), validPwd || (stryMutAct_9fa48("104") ? pwd : (stryCov_9fa48("104"), !pwd)))) ? stryMutAct_9fa48("105") ? "" : (stryCov_9fa48("105"), "hide") : stryMutAct_9fa48("106") ? "" : (stryCov_9fa48("106"), "invalid")} />
            </label>
            <input type="password" id="password" onChange={stryMutAct_9fa48("107") ? () => undefined : (stryCov_9fa48("107"), e => setPwd(e.target.value))} value={pwd} required aria-invalid={validPwd ? stryMutAct_9fa48("108") ? "" : (stryCov_9fa48("108"), "false") : stryMutAct_9fa48("109") ? "" : (stryCov_9fa48("109"), "true")} aria-describedby="pwdnote" onFocus={stryMutAct_9fa48("110") ? () => undefined : (stryCov_9fa48("110"), () => setPwdFocus(stryMutAct_9fa48("111") ? false : (stryCov_9fa48("111"), true)))} onBlur={stryMutAct_9fa48("112") ? () => undefined : (stryCov_9fa48("112"), () => setPwdFocus(stryMutAct_9fa48("113") ? true : (stryCov_9fa48("113"), false)))} autoComplete="off" />
            <p id="pwdnote" className={(stryMutAct_9fa48("116") ? pwdFocus || !validPwd : stryMutAct_9fa48("115") ? false : stryMutAct_9fa48("114") ? true : (stryCov_9fa48("114", "115", "116"), pwdFocus && (stryMutAct_9fa48("117") ? validPwd : (stryCov_9fa48("117"), !validPwd)))) ? stryMutAct_9fa48("118") ? "" : (stryCov_9fa48("118"), "instructions") : stryMutAct_9fa48("119") ? "" : (stryCov_9fa48("119"), "offscreen")}>
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters.
              <br />
              Must include uppercase and lowercase letters, a number and a
              special character.
              <br />
              Allowed special characters:{stryMutAct_9fa48("120") ? "" : (stryCov_9fa48("120"), " ")}
              <span aria-label="exclamation mark">!</span>{stryMutAct_9fa48("121") ? "" : (stryCov_9fa48("121"), " ")}
              <span aria-label="at symbol">@</span>{stryMutAct_9fa48("122") ? "" : (stryCov_9fa48("122"), " ")}
              <span aria-label="hashtag">#</span>{stryMutAct_9fa48("123") ? "" : (stryCov_9fa48("123"), " ")}
              <span aria-label="dollar sign">$</span>{stryMutAct_9fa48("124") ? "" : (stryCov_9fa48("124"), " ")}
              <span aria-label="percent">%</span>
            </p>

            <label htmlFor="confirm_pwd">
              Confirm Password:
              <FontAwesomeIcon icon={faCheck} className={(stryMutAct_9fa48("127") ? validMatch || matchPwd : stryMutAct_9fa48("126") ? false : stryMutAct_9fa48("125") ? true : (stryCov_9fa48("125", "126", "127"), validMatch && matchPwd)) ? stryMutAct_9fa48("128") ? "" : (stryCov_9fa48("128"), "valid") : stryMutAct_9fa48("129") ? "" : (stryCov_9fa48("129"), "hide")} />
              <FontAwesomeIcon icon={faTimes} className={(stryMutAct_9fa48("132") ? validMatch && !matchPwd : stryMutAct_9fa48("131") ? false : stryMutAct_9fa48("130") ? true : (stryCov_9fa48("130", "131", "132"), validMatch || (stryMutAct_9fa48("133") ? matchPwd : (stryCov_9fa48("133"), !matchPwd)))) ? stryMutAct_9fa48("134") ? "" : (stryCov_9fa48("134"), "hide") : stryMutAct_9fa48("135") ? "" : (stryCov_9fa48("135"), "invalid")} />
            </label>
            <input type="password" id="confirm_pwd" onChange={stryMutAct_9fa48("136") ? () => undefined : (stryCov_9fa48("136"), e => setMatchPwd(e.target.value))} value={matchPwd} required aria-invalid={validMatch ? stryMutAct_9fa48("137") ? "" : (stryCov_9fa48("137"), "false") : stryMutAct_9fa48("138") ? "" : (stryCov_9fa48("138"), "true")} aria-describedby="confirmnote" onFocus={stryMutAct_9fa48("139") ? () => undefined : (stryCov_9fa48("139"), () => setMatchFocus(stryMutAct_9fa48("140") ? false : (stryCov_9fa48("140"), true)))} onBlur={stryMutAct_9fa48("141") ? () => undefined : (stryCov_9fa48("141"), () => setMatchFocus(stryMutAct_9fa48("142") ? true : (stryCov_9fa48("142"), false)))} autoComplete="off" />
            <p id="confirmnote" className={(stryMutAct_9fa48("145") ? matchFocus || !validMatch : stryMutAct_9fa48("144") ? false : stryMutAct_9fa48("143") ? true : (stryCov_9fa48("143", "144", "145"), matchFocus && (stryMutAct_9fa48("146") ? validMatch : (stryCov_9fa48("146"), !validMatch)))) ? stryMutAct_9fa48("147") ? "" : (stryCov_9fa48("147"), "instructions") : stryMutAct_9fa48("148") ? "" : (stryCov_9fa48("148"), "offscreen")}>
              <FontAwesomeIcon icon={faInfoCircle} />
              Must match the first password input field.
            </p>
            <button disabled={(stryMutAct_9fa48("151") ? (!validName || !validPwd) && !validMatch : stryMutAct_9fa48("150") ? false : stryMutAct_9fa48("149") ? true : (stryCov_9fa48("149", "150", "151"), (stryMutAct_9fa48("153") ? !validName && !validPwd : stryMutAct_9fa48("152") ? false : (stryCov_9fa48("152", "153"), (stryMutAct_9fa48("154") ? validName : (stryCov_9fa48("154"), !validName)) || (stryMutAct_9fa48("155") ? validPwd : (stryCov_9fa48("155"), !validPwd)))) || (stryMutAct_9fa48("156") ? validMatch : (stryCov_9fa48("156"), !validMatch)))) ? stryMutAct_9fa48("157") ? false : (stryCov_9fa48("157"), true) : stryMutAct_9fa48("158") ? true : (stryCov_9fa48("158"), false)}>
              Sign Up
            </button>
          </form>
          <p>
            Already registered?
            <br />
            <span className="line">
              {/*put router link here*/}
              <a href="#">Sign In</a>
            </span>
          </p>
        </section>}
    </>;
  }
}
export default Register;