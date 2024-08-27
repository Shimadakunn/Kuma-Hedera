// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import { EntryPoint } from "account-abstraction/core/EntryPoint.sol";
import {console2} from "forge-std/console2.sol";

contract DeployEntryPoint is Script {
    function run() public {
        vm.startBroadcast();
        EntryPoint ep = new EntryPoint();
        console2.log("EntryPoint deployed at", address(ep));
        vm.stopBroadcast();
    }
}
