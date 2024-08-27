// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "account-abstraction/interfaces/IEntryPoint.sol";
import {P256Verifier} from "../src/P256Verifier.sol";
import {console2} from "forge-std/console2.sol";

contract DeployP256Verifier is Script {
    function run() public {
        vm.startBroadcast();
        P256Verifier p256 = new P256Verifier();
        console2.log("P256Verifier deployed at", address(p256));
        vm.stopBroadcast();
    }
}
