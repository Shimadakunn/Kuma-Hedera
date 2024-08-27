// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import {console2} from "forge-std/console2.sol";
import "forge-std/Script.sol";
import "account-abstraction/interfaces/IEntryPoint.sol";
import {Factory} from "../src/Factory.sol";

contract DeployFactory is Script {
    function run() public {
        vm.startBroadcast();

        // From https://docs.stackup.sh/docs/entity-addresses#entrypoint
        IEntryPoint entryPoint = IEntryPoint(
            0x48d2642087dD86F86ed205Ab204Fd10a5CB076F8
        );

        Factory factory = new Factory(entryPoint);
        console2.log("Factory deployed at", address(factory));
        vm.stopBroadcast();
    }
}
