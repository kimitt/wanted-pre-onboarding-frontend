import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import instance from "../../api/instance";




const SignUp = () => {
  const navigate = useNavigate();

  const [checkIn, setCheckIn] = useState(false);

  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [checkEmail, setCheckEmail] = useState(false);
  const [checkPassword, setCheckPassword] = useState(false);

  //이메일 유효성 
  const confirmEmail = (value) => {
    return /\w+@\w/.test(value);
  }
  //비밀번호 유효성
  const confirmPassword = (value) => {
    return value.length >= 8;
  }

  const changeHandler = (event) => {
    const { id, value } = event.target;
    setUser((prev) => ({ ...prev, [id]: value }));
    if (id === "email") {
      setCheckEmail(confirmEmail(value));
    } else {
      setCheckPassword(confirmPassword(value));
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (checkIn) {
        await instance.post('/auth/signup', user);
        setCheckIn(false);
        alert("가입성공");
      } else {
        const { data } = await instance.post('/auth/signin', user);
        localStorage.setItem('token', data.access_token);
        navigate('/todo');
      }
    } catch (error) {
      alert(error.response.data.message);
    }
      }
   

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/todo');
    }
  }, [navigate]);



  return (
    <div className="flex justify-center mt-14">
      <div className="w-[500px] h-[600px] bg-blue-100 p-14 rounded-xl">
        <div className="flex justify-center mb-7">
          <span className="font-black text-3xl">
            {checkIn ? "회원가입" : "로그인"}
          </span>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col ">
          <div className="flex flex-col">
            <label className="font-medium text-xl pr-6 pb-3">이메일</label>
            <input
              className=" h-14 rounded-lg text-lg p-3 mb-4"
              type="text"
              id="email"
              value={user.email}
              required
              placeholder="이메일을 입력해주세요"
              onChange={changeHandler}
            />
            {!checkEmail &&
              <span className="text-red-500 text-lg">올바른 형식이 아닙니다</span>}
          </div>
          <div className="flex flex-col">
            <label className="font-medium text-xl pr-2 pb-3 mt-4">
              비밀번호
            </label>
            <input
              className="h-14 rounded-lg text-lg p-3 mb-4"
              type="password"
              id="password"
              value={user.password}
              required
              onChange={changeHandler}
            />
            {!checkPassword &&
              <span className="text-red-500 text-lg">비밀번호는 8글자 이상</span>}
          </div>
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="w-full h-[60px] rounded-xl bg-blue-500 font-bold text-xl text-white"
              disabled={checkEmail && checkPassword ? false : true}
            >
              {checkIn ? "가입하기!" : "로그인하기!"}
            </button>
          </div>
        </form>
        <div
          className="flex justify-center mt-14 text-lg text-gray-600"
          onClick={() => setCheckIn((prev) => !prev)}
        >
          {checkIn ? "로그인하러가기" : "회원가입하러가기"}
        </div>
      </div>
    </div>
  );
};

export default SignUp;
