import axiosClient from "@/api/axiosClient";

const WalletApi = {
  getWithdrawalRequests: (token) => {
    const url = "/withdraw";
    return axiosClient.get(url, { headers: { token: token } });
  }
}

export default WalletApi;