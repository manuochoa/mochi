// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";


contract mochiStaking is Ownable, Pausable {
    // Address of the token for the staking.
    IERC20 public acceptedToken;
    
    // Struc with user details.
    struct _user {
        uint256 balance;
        uint256 timeStarted;
        uint256 timeFinish;
    }    

    // APY for each class.
    uint256 public level0APY =  2700;
    uint256 public level1APY = 3700;
    uint256 public vipLevelAPY = 4800;  

    // Min - Max for each Level
    uint256 public level0Min = 50 * 10**18;
    uint256 public level0Max = 500000000 * 10**18;
    uint256 public level1Min = 100 * 10**18;
    uint256 public level1Max = 500000000 * 10**18;
    uint256 public levelVipMin = 200 * 10**18;
    uint256 public levelVipMax = 2500000000 * 10**18;
    
    // reserve wallet
    address public reserveWallet;
    
    // Mapping for user details of  each class.
    mapping (address => bool) public isLevel0;
    mapping (address => _user) public level0Balance;
    mapping (address => bool) public isLevel1;
    mapping (address => _user) public level1Balance;
    mapping (address => bool) public isVip;
    mapping (address => _user) public vipBalance;  

    // Events.
    event deposit (address user, uint8 class, uint256 amount, uint256 timeStart, uint256 timeEnd);
    event withdraw (address user, uint8 class, bool onTime, uint256 amount, uint256 earnings);
 
    // Set the token to be staked.
    constructor(address _token , address _reserveWallet) {
        acceptedToken = IERC20(_token);
        reserveWallet = _reserveWallet;       
    }   
    
    // Pause and Unpause the contract
    function pause () public onlyOwner {
        _pause();
    }
    
    function unpause () public onlyOwner {
        _unpause();
    } 

    /**
    * @dev Change Reserve Wallet.   
    */

    function setReserveWallet (address _reserveWallet) external onlyOwner{
        reserveWallet = _reserveWallet;   
    }

    /**
    * @dev Change APY for all categories.   
    */

    function setNewAPY ( uint256 _level0APY, uint256 _level1APY, uint256 _vipLevelAPY) external onlyOwner{
        level0APY = _level0APY;
        level1APY = _level1APY;
        vipLevelAPY = _vipLevelAPY;
    }

    /**
    * @dev Change max and min values for all categories.   
    */

    function setNewMaxMin (uint256 _level0Min, uint256 _level0Max, uint256 _level1Min, uint256 _level1Max, uint256 _levelVipMin, uint256 _levelVipMax) external onlyOwner{
        level0Min = _level0Min;
        level0Max = _level0Max;
        level1Min = _level1Min;
        level1Max = _level1Max;
        levelVipMin = _levelVipMin;
        levelVipMax = _levelVipMax;
    }

    /**
    * @dev Join to a staking class.
    *
    * Requirements:
    *  
    * - User has not enter the staking class previously. 
    */
    function enterLevel0 (uint256 _amount) public whenNotPaused {
        require(_amount <= level0Max && _amount >= level0Min, "Amount needs to be more than min and less than max");
        address _msgSender = msg.sender;     
        require(!isLevel0[_msgSender], "You're already in this Stake level");    

        acceptedToken.transferFrom(_msgSender, address(this), _amount);

        isLevel0[_msgSender] = true;
        level0Balance[_msgSender] = _user ({
            balance: _amount,
            timeStarted: block.timestamp,
            timeFinish: block.timestamp + 7 days
        });         

        emit deposit (_msgSender, 0, _amount, block.timestamp, block.timestamp + 7 days);
    }
    
    /**
    * @dev Join to a staking class.
    *
    * Requirements:
    *   
    * - User has not enter the staking class previously.   
    */
    function enterLevel1 (uint256 _amount) public whenNotPaused {
        require(_amount <= level1Max && _amount >= level1Min, "Amount needs to be more than min and less than max");
        address _msgSender = msg.sender;  
        require(!isLevel1[_msgSender], "You're already in this Stake level");      

        acceptedToken.transferFrom(_msgSender, address(this), _amount);

        isLevel1[_msgSender] = true;
        level1Balance[_msgSender] = _user ({
           balance: _amount,
           timeStarted: block.timestamp,
           timeFinish: block.timestamp + 30 days
        });
    
        emit deposit (_msgSender, 1, _amount, block.timestamp, block.timestamp + 30 days);
    }

    /**
    * @dev Join to a staking class.
    *
    * Requirements:
    *
    * - _amount must be greather than enter fee.
    * - User has not enter the staking class previously.    
    */
    function enterVip (uint256 _amount) public whenNotPaused {
        require(_amount <= levelVipMax && _amount >= levelVipMin, "Amount needs to be more than min and less than max");
        address _msgSender = msg.sender;             
        require(!isVip[_msgSender], "You're already in the Vip Stake");        

        acceptedToken.transferFrom(_msgSender, address(this), _amount);

        isVip[_msgSender] = true;
        vipBalance[_msgSender] = _user ({
           balance: _amount,
           timeStarted: block.timestamp,
           timeFinish: block.timestamp + 90 days
        });       

        emit deposit (_msgSender, 2, _amount, block.timestamp, block.timestamp + 90 days);
    }

 
    /**
    * @dev Checks if the staking has reached the timeFinish limit.
    *
    * classes :0 - level 0, 1 - level 1, 2 - Vip
    */
    function isOnTime (address user, uint8 class) public view returns (bool) {
        uint256 releaseTime;
        if(class == 0){
            releaseTime = level0Balance[user].timeFinish;           
        } else if (class == 1){
            releaseTime = level1Balance[user].timeFinish;         
        } else if (class == 2){
            releaseTime = vipBalance[user].timeFinish;           
        } else {
            return false;
        }
        return block.timestamp >= releaseTime;
    }
 

    /**
    * @dev Get interest earned during the staking time.
    *
    * classes : 0 - level 0, 1 - level 1, 2 - Vip
    */
    function getInterest (address user, uint8 class, uint256 balance) public view returns (uint256){
        if(class == 0){           
            uint256 _timeStarted = level0Balance[user].timeStarted;

            return calculateInterest(balance,_timeStarted, level0APY);
        } else if (class == 1){      
            uint256 _timeStarted = level1Balance[user].timeStarted;

            return calculateInterest(balance,_timeStarted, level1APY);
        } else if (class == 2){           
            uint256 _timeStarted = vipBalance[user].timeStarted;

            return calculateInterest(balance,_timeStarted, vipLevelAPY);
        } else {
            return 0;
        }
    }

    function calculateInterest (uint256 _balance, uint256 _timeStarted, uint256 _APY) internal view returns (uint256){
        uint256 timeStaked = block.timestamp - _timeStarted;
       
        uint256 interestPerSecond = ((_balance * _APY) / 10000) / 365 days;
        uint256 interestsEarned = timeStaked * interestPerSecond;

        return interestsEarned;
    }

    /**
    * @dev Withdraw from a staking class.
    *
    * Requirements:
    *
    * - Msg.sender should have an active deposit in the class.
    */
    function withdrawLevel0 (uint256 _amount) public  {
        address _msgSender = msg.sender;
        require(isLevel0[_msgSender], "User is not on Level 0");

        uint256 balance = level0Balance[_msgSender].balance;
        require(balance >= _amount, "Not enough balance to withdraw");

        bool _isOnTime = isOnTime(_msgSender, 0);
        uint256 earnings = getInterest(_msgSender, 0, _amount);

        if(_amount == balance){
            delete level0Balance[_msgSender];      
            isLevel0[_msgSender] = false;
        } else {
            level0Balance[_msgSender].balance -= _amount;
        }

        if(_isOnTime){
            acceptedToken.transfer(_msgSender, _amount);
            acceptedToken.transferFrom(reserveWallet, _msgSender, earnings);
        } else {
            earnings = 0;       
            acceptedToken.transfer(_msgSender, _amount);           
        }
    
        emit withdraw(_msgSender, 0, _isOnTime, _amount, earnings);
    }

    /**
    * @dev Withdraw from a staking class.
    *
    * Requirements:
    *
    * - Msg.sender should have an active deposit in the class.
    */
    function withdrawLevel1 (uint256 _amount) public  {
        address _msgSender = msg.sender;
        require(isLevel1[_msgSender], "User is not on Level 1");

        uint256 balance = level1Balance[_msgSender].balance;
        require(balance >= _amount, "Not enough balance to withdraw");

        bool _isOnTime = isOnTime(_msgSender, 1);
        uint256 earnings = getInterest(_msgSender, 1, _amount);

        if(_amount == balance){
            delete level1Balance[_msgSender];      
            isLevel1[_msgSender] = false;
        } else {
            level1Balance[_msgSender].balance -= _amount;
        }

        if(_isOnTime){
            acceptedToken.transfer(_msgSender, _amount);
            acceptedToken.transferFrom(reserveWallet, _msgSender, earnings);
        } else {
            earnings = 0;         
            acceptedToken.transfer(_msgSender, _amount);           
        }

        emit withdraw(_msgSender, 1, _isOnTime, _amount, earnings);
    }

    /**
    * @dev Withdraw from a staking class.
    *
    * Requirements:
    *
    * - Msg.sender should have an active deposit in the class.
    */
    function withdrawVip (uint256 _amount) public  {
        address _msgSender = msg.sender;
        require(isVip[_msgSender], "User is not Vip");
    
        uint256 balance = vipBalance[_msgSender].balance;
        require(balance >= _amount, "Not enough balance to withdraw");

        bool _isOnTime = isOnTime(_msgSender, 2);
        uint256 earnings = getInterest(_msgSender, 2, _amount);

        if(_amount == balance){
            delete vipBalance[_msgSender];     
            isVip[_msgSender] = false;
        } else {
            vipBalance[_msgSender].balance -= _amount;
        }

        if(_isOnTime){
            acceptedToken.transfer(_msgSender, _amount);
            acceptedToken.transferFrom(reserveWallet, _msgSender, earnings);
        } else {
            earnings = 0;           
            acceptedToken.transfer(_msgSender, _amount);           
        }

        emit withdraw(_msgSender, 2, _isOnTime, _amount, earnings);
    }  
}