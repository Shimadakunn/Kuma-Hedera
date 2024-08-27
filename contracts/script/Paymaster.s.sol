// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

import "forge-std/Script.sol";
import "account-abstraction/interfaces/IEntryPoint.sol";
import {Paymaster} from "../src/Paymaster.sol";
import {console2} from "forge-std/console2.sol";

contract DeployPaymaster is Script {
    function run() public {
        vm.startBroadcast();

        // From https://docs.stackup.sh/docs/entity-addresses#entrypoint
        IEntryPoint entryPoint = IEntryPoint(
            0x48d2642087dD86F86ed205Ab204Fd10a5CB076F8
        );

        address owner = 0x1f29312f134C79984bA4b21840f2C3DcF57b9c85;

        Paymaster pm = new Paymaster(entryPoint, owner);
        console2.log("Paymaster deployed at", address(pm));
        vm.stopBroadcast();
    }
}
